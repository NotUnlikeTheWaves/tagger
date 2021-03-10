package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func createFileList(files []os.FileInfo) []Document {
	size := len(files)
	entryList := make([]Document, size)
	for i, v := range files {
		tags, err := findDocumentTags(v.Name())
		if err != nil {
			fmt.Printf("Unknown error in creatFileList when trying to get tags: %s", err.Error())
		}
		entryList[i] = Document{
			Name:    v.Name(),
			Size:    v.Size(),
			LastMod: v.ModTime(),
			Tags:    tags,
		}
	}
	return entryList
}

func fileExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

func getDocumentDir() string {
	documentDirName := "documents"
	path, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	documentDir := filepath.Join(path, documentDirName)
	return documentDir
}

func initDocumentDirectory(path string) error {
	// TODO: Expand with permissions check.
	fmt.Printf("Using document directory %s\n", path)

	exists, err := fileExists(path)
	if err != nil {
		fmt.Printf("Failed to init document directory. Error: %s", err)
		os.Exit(1)
	}
	if !exists {
		fmt.Println("Document directory not found, attempting to create...")
		err := os.Mkdir(path, os.ModePerm)
		if err != nil {
			fmt.Printf("Failed to created document directory. Error: %s", err)
		}
	}
	fmt.Println("Successfully inited document directory.")
	return nil
}
