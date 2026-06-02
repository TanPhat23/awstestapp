package main

import "github.com/gorilla/websocket"

type Client struct {
	conn *websocket.Conn
	msg  chan []byte
}

func NewClient(conn *websocket.Conn) *Client {
	return &Client{
		conn: conn,
		msg:  make(chan []byte, 256),
	}
}

func (c *Client) Read(hub *Hub) {
	defer func() {
		hub.unregister <- c
	}()
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			break
		}
		hub.broadcast <- message
	}
}

func (c *Client) Write() {
	defer func() {
		c.conn.Close()
	}()
	for msg := range c.msg {
		err := c.conn.WriteMessage(websocket.TextMessage, msg)
		if err != nil {
			break
		}
	}
}
