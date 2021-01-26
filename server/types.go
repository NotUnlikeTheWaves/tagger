package main

import "time"

// A FileEntry is a struct containing a file path and size in e.g. a list of files.
type FileEntry struct {
	Path    string
	Size    int64
	Lastmod time.Time
}
