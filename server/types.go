package main

import "time"

type Tag struct {
	Name   string `bson:"Name"`
	Hidden bool   `bson:"Hidden"`
}

// A FileEntry is a struct containing a file path and size in e.g. a list of files.
type FileEntry struct {
	Name    string
	Size    int64
	LastMod time.Time
	Url     string
	Tags    []Tag
}
