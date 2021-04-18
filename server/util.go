package main

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
)

func createFileList(files []os.FileInfo) []Document {
	size := len(files)
	entryList := make([]Document, size)
	for i, v := range files {
		doc, err := createDocumentFromFile(v)
		if err != nil {
			fmt.Printf("Error doing createDocumentFromFile: %s", err.Error())
		}
		entryList[i] = doc
	}
	return entryList
}

func retrieveDocumentFromFileName(fileName string) (Document, error) {
	filePath := filepath.Join(getDocumentDir(), fileName)
	exists, err := fileExists(filePath)
	if exists == false {
		return Document{}, errors.New("File not found")
	}
	if err != nil {
		return Document{}, err
	}

	fileInfo, err := os.Lstat(filePath)

	if err != nil {
		return Document{}, err
	}

	document, err := createDocumentFromFile(fileInfo)
	return document, err
}

func createDocumentFromFile(fileInfo os.FileInfo) (Document, error) {
	tags, err := findDocumentTags(fileInfo.Name())
	if err != nil {
		return Document{}, err
	}
	document := mergeDbDocWithFileDoc(DbDocument{Tags: tags}, fileInfo)
	return document, nil
}

func mergeDbDocWithFileDoc(dbDoc DbDocument, fileDoc os.FileInfo) Document {
	return Document{
		Name:         fileDoc.Name(),
		Size:         fileDoc.Size(),
		LastMod:      fileDoc.ModTime(),
		Tags:         dbDoc.Tags,
		Url:          fmt.Sprintf("/api/v1/content/%s", fileDoc.Name()),
		DateCreated:  dbDoc.DateCreated,
		DateModified: dbDoc.DateModified,
	}
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

func mergeWithDbModel(doc Document, dbDoc DbDocument) Document {
	doc.Tags = dbDoc.Tags
	return doc
}
