package main

import (
	"sync"
	"testing"
	"time"
)

func TestHubLifecycleAndBroadcast(t *testing.T) {
	h := NewHub()
	go h.Run()

	c1 := NewClient(nil)
	c2 := NewClient(nil)

	// Register clients
	h.register <- c1
	h.register <- c2

	// Wait for registration to process
	time.Sleep(20 * time.Millisecond)

	// Broadcast message
	testMsg := []byte("hello cluster")
	h.broadcast <- testMsg

	select {
	case msg := <-c1.msg:
		if string(msg) != string(testMsg) {
			t.Fatalf("c1 expected %s, got %s", testMsg, msg)
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timeout waiting for c1 message")
	}

	select {
	case msg := <-c2.msg:
		if string(msg) != string(testMsg) {
			t.Fatalf("c2 expected %s, got %s", testMsg, msg)
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timeout waiting for c2 message")
	}

	// Unregister c1
	h.unregister <- c1

	select {
	case <-c1.done:
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timeout waiting for c1.done to close")
	}

	// Check that c1.msg is closed
	_, ok := <-c1.msg
	if ok {
		t.Fatal("expected c1.msg to be closed")
	}

	// Second broadcast should only reach c2
	msg2 := []byte("second message")
	h.broadcast <- msg2

	select {
	case msg := <-c2.msg:
		if string(msg) != string(msg2) {
			t.Fatalf("c2 expected %s, got %s", msg2, msg)
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timeout waiting for c2 message")
	}

	// Double unregister should not panic
	h.unregister <- c1
	time.Sleep(20 * time.Millisecond)
}

func TestHubSlowClientEviction(t *testing.T) {
	h := NewHub()
	go h.Run()

	slowClient := NewClient(nil)
	fastClient := NewClient(nil)

	h.register <- slowClient
	h.register <- fastClient

	time.Sleep(20 * time.Millisecond)

	// Fill slowClient's message buffer (capacity 256)
	for i := 0; i < 256; i++ {
		slowClient.msg <- []byte("fill buffer")
	}

	// Now broadcast another message. Slow client's buffer is full, so default branch in select must evict it
	h.broadcast <- []byte("overflow message")

	// Verify slowClient is evicted and closed
	select {
	case <-slowClient.done:
	case <-time.After(1 * time.Second):
		t.Fatal("expected slowClient.done to be closed on buffer overflow")
	}

	// Verify fastClient still receives the overflow message
	select {
	case msg := <-fastClient.msg:
		if string(msg) != "overflow message" {
			t.Fatalf("expected overflow message, got %s", msg)
		}
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timeout waiting for fastClient message")
	}

	// Evicted client sending unregister afterwards shouldn't panic
	h.unregister <- slowClient
	time.Sleep(20 * time.Millisecond)
}

func TestHubConcurrentRegisterUnregister(t *testing.T) {
	h := NewHub()
	go h.Run()

	const clientCount = 50
	var wg sync.WaitGroup

	clients := make([]*Client, clientCount)
	for i := 0; i < clientCount; i++ {
		clients[i] = NewClient(nil)
	}

	// Concurrently register
	wg.Add(clientCount)
	for i := 0; i < clientCount; i++ {
		go func(c *Client) {
			defer wg.Done()
			h.register <- c
		}(clients[i])
	}
	wg.Wait()

	// Concurrently broadcast and unregister
	wg.Add(clientCount + 5)

	for b := 0; b < 5; b++ {
		go func(val int) {
			defer wg.Done()
			h.broadcast <- []byte("ping")
		}(b)
	}

	for i := 0; i < clientCount; i++ {
		go func(c *Client) {
			defer wg.Done()
			h.unregister <- c
		}(clients[i])
	}

	wg.Wait()
}
