package main

import "time"

// A FileEntry is a struct containing a file path and size in e.g. a list of files.
type FileEntry struct {
	Name       string
	Size       int64
	Lastmod    time.Time
	Url        string
	Tags       []string
	HiddenTags []string
}
