package main

import "github.com/gorilla/websocket"

type Client struct {
	conn *websocket.Conn
	msg  chan []byte
	done chan struct{}
}

func NewClient(conn *websocket.Conn) *Client {
	return &Client{
		conn: conn,
		msg:  make(chan []byte, 256),
		done: make(chan struct{}),
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
	for {
		select {
		case msg, ok := <-c.msg:
			if !ok {
				return
			}
			err := c.conn.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				return
			}
		case <-c.done:
			return
		}
	}
}
