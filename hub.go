package main

import "log"

type Hub struct {
	clients    map[*Client]bool
	broadcast  chan []byte
	register   chan *Client
	unregister chan *Client
}

func NewHub() *Hub {
	return &Hub{
		clients:    make(map[*Client]bool),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (h *Hub) Run() {
	for {
		select {
		case client := <-h.register:
			h.clients[client] = true
			log.Printf("Client registered: %v", client)
		case client := <-h.unregister:
			if _, ok := h.clients[client]; ok {
				delete(h.clients, client)
				close(client.msg)
				client.conn.Close()
				log.Printf("Client unregistered: %v", client)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.msg <- message:
				default:
					close(client.msg)
					delete(h.clients, client)
					client.conn.Close()
					log.Printf("Client removed: %v", client)
				}
			}
		}
	}
}
