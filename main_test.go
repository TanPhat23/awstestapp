package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/gorilla/websocket"
)

func setupTestServer() (*httptest.Server, *Hub) {
	h := NewHub()
	go h.Run()

	mux := http.NewServeMux()
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			return
		}
		client := NewClient(conn)
		h.register <- client
		go client.Read(h)
		go client.Write()
	})

	server := httptest.NewServer(mux)
	return server, h
}

func TestWebSocketEchoAndBroadcast(t *testing.T) {
	server, _ := setupTestServer()
	defer server.Close()

	wsURL := "ws" + strings.TrimPrefix(server.URL, "http") + "/ws"

	// Connect two clients
	ws1, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		t.Fatalf("Failed to dial ws1: %v", err)
	}
	defer ws1.Close()

	ws2, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		t.Fatalf("Failed to dial ws2: %v", err)
	}
	defer ws2.Close()

	// Wait for registration
	time.Sleep(50 * time.Millisecond)

	// Send message from ws1
	testMsg := "Hello from client 1"
	if err := ws1.WriteMessage(websocket.TextMessage, []byte(testMsg)); err != nil {
		t.Fatalf("Failed to write message from ws1: %v", err)
	}

	// Both ws1 and ws2 should receive the broadcast message
	msgType1, data1, err := ws1.ReadMessage()
	if err != nil {
		t.Fatalf("ws1 failed to read message: %v", err)
	}
	if msgType1 != websocket.TextMessage || string(data1) != testMsg {
		t.Fatalf("ws1 received unexpected message: %s", string(data1))
	}

	msgType2, data2, err := ws2.ReadMessage()
	if err != nil {
		t.Fatalf("ws2 failed to read message: %v", err)
	}
	if msgType2 != websocket.TextMessage || string(data2) != testMsg {
		t.Fatalf("ws2 received unexpected message: %s", string(data2))
	}
}

func TestWebSocketDisconnectionCleanup(t *testing.T) {
	server, h := setupTestServer()
	defer server.Close()

	wsURL := "ws" + strings.TrimPrefix(server.URL, "http") + "/ws"

	ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
	if err != nil {
		t.Fatalf("Failed to dial ws: %v", err)
	}

	time.Sleep(50 * time.Millisecond)

	// Verify one client registered
	// Close connection from client side
	if err := ws.Close(); err != nil {
		t.Fatalf("Failed to close ws: %v", err)
	}

	// Give time for Read to get error, trigger defer and unregister
	time.Sleep(100 * time.Millisecond)

	// Verify hub continues to operate properly
	c2 := NewClient(nil)
	h.register <- c2
	time.Sleep(20 * time.Millisecond)
	h.broadcast <- []byte("test after close")

	select {
	case msg := <-c2.msg:
		if string(msg) != "test after close" {
			t.Fatalf("unexpected message: %s", msg)
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timeout waiting for message on c2")
	}
}

func TestWebSocketConcurrentClients(t *testing.T) {
	server, _ := setupTestServer()
	defer server.Close()

	wsURL := "ws" + strings.TrimPrefix(server.URL, "http") + "/ws"

	const clientCount = 10
	clients := make([]*websocket.Conn, clientCount)

	for i := 0; i < clientCount; i++ {
		ws, _, err := websocket.DefaultDialer.Dial(wsURL, nil)
		if err != nil {
			t.Fatalf("Failed to dial ws %d: %v", i, err)
		}
		defer ws.Close()
		clients[i] = ws
	}

	time.Sleep(100 * time.Millisecond)

	// Concurrently send messages from each client
	var wg sync.WaitGroup
	wg.Add(clientCount)
	for i := 0; i < clientCount; i++ {
		go func(idx int, c *websocket.Conn) {
			defer wg.Done()
			msg := fmt.Sprintf("message from %d", idx)
			_ = c.WriteMessage(websocket.TextMessage, []byte(msg))
		}(i, clients[i])
	}
	wg.Wait()

	// Concurrently read at least 1 message on each client
	wg.Add(clientCount)
	for i := 0; i < clientCount; i++ {
		go func(idx int, c *websocket.Conn) {
			defer wg.Done()
			_ = c.SetReadDeadline(time.Now().Add(1 * time.Second))
			_, _, _ = c.ReadMessage()
		}(i, clients[i])
	}
	wg.Wait()
}
