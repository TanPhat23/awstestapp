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
				close(client.done)
				log.Printf("Client unregistered: %v", client)
			}
		case message := <-h.broadcast:
			for client := range h.clients {
				select {
				case client.msg <- message:
				default:
					delete(h.clients, client)
					close(client.msg)
					close(client.done)
					log.Printf("Client removed (buffer full): %v", client)
				}
			}
		}
	}
}
