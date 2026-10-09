package main

import (
	"sync"
	"testing"
	"time"
)

func TestClientCloseDoneIdempotent(t *testing.T) {
	c := NewClient(nil)

	// Call CloseDone multiple times concurrently
	var wg sync.WaitGroup
	for i := 0; i < 20; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			c.CloseDone()
		}()
	}
	wg.Wait()

	// done channel should be closed
	select {
	case <-c.done:
	default:
		t.Fatal("expected c.done to be closed")
	}
}

func TestClientWriteClosesOnDone(t *testing.T) {
	c := NewClient(nil)
	writeStopped := make(chan struct{})

	go func() {
		c.Write()
		close(writeStopped)
	}()

	// Signal done
	c.CloseDone()

	select {
	case <-writeStopped:
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timed out waiting for c.Write to exit on c.done")
	}
}

func TestClientWriteClosesOnMsgClosed(t *testing.T) {
	c := NewClient(nil)
	writeStopped := make(chan struct{})

	go func() {
		c.Write()
		close(writeStopped)
	}()

	// Close message channel
	close(c.msg)

	select {
	case <-writeStopped:
	case <-time.After(500 * time.Millisecond):
		t.Fatal("timed out waiting for c.Write to exit on close(c.msg)")
	}
}
