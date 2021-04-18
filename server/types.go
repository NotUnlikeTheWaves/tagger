package main

import "time"

type Tag struct {
	Name   string `bson:"Name"`
	Hidden bool   `bson:"Hidden"`
}

// A Document is a struct containing a file path and size in e.g. a list of files.
type Document struct {
	Name         string
	Size         int64
	LastMod      time.Time // consider if this is still relevant vs DateCreated
	Url          string
	Tags         []Tag
	DateCreated  time.Time
	DateModified time.Time
}
