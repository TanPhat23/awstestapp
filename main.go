package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var hub *Hub

func HandleSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}
	client := NewClient(conn)
	hub.register <- client
	go client.Read(hub)
	go client.Write()
}

func main() {
	hub = NewHub()
	go hub.Run()

	mux := http.NewServeMux()
	mux.HandleFunc("/ws", HandleSocket)
	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}
	fmt.Println("Server started on :8080")
	server.ListenAndServe()
}
