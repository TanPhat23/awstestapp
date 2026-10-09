package main

import (
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	conn     *websocket.Conn
	msg      chan []byte
	done     chan struct{}
	closeOnce sync.Once
}

func NewClient(conn *websocket.Conn) *Client {
	return &Client{
		conn: conn,
		msg:  make(chan []byte, 256),
		done: make(chan struct{}),
	}
}

// CloseDone safely closes the client's done channel exactly once and closes the connection.
func (c *Client) CloseDone() {
	c.closeOnce.Do(func() {
		close(c.done)
		if c.conn != nil {
			c.conn.Close()
		}
	})
}

func (c *Client) Read(hub *Hub) {
	defer func() {
		hub.unregister <- c
		c.CloseDone()
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
		c.CloseDone()
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
