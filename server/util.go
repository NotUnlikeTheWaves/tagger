package main

import (
	"errors"
	"fmt"
	"io/fs"
	"io/ioutil"
	"os"
	"path/filepath"

	"github.com/h2non/filetype"
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
	doc, err := findDocument(fileInfo.Name())
	if err != nil {
		return Document{}, err
	}
	document := mergeDbDocWithFileDoc(doc, fileInfo)
	return document, nil
}

func mergeDbDocWithFileDoc(dbDoc DbDocument, fileDoc os.FileInfo) Document {
	typeString := getFileType(fileDoc)
	return Document{
		Name:         fileDoc.Name(),
		Size:         fileDoc.Size(),
		Tags:         dbDoc.Tags,
		Url:          fmt.Sprintf("/api/v1/content/%s", fileDoc.Name()),
		Type:         typeString,
		DateCreated:  dbDoc.DateCreated,
		DateModified: dbDoc.DateModified,
	}
}

func getFileType(file fs.FileInfo) string {
	buf, _ := ioutil.ReadFile(filepath.Join(getDocumentDir(), file.Name()))
	if filetype.IsVideo(buf) {
		return "video"
	}
	if filetype.IsImage(buf) {
		return "image"
	}
	return "unknown"
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

func addOrRemoveUntaggedTag(tagList []Tag) []Tag {
	if len(tagList) > 1 {
		remove := -1
		for i, tag := range tagList {
			if tag.Name == "untagged" {
				remove = i
				break
			}
		}
		if remove != -1 {
			fmt.Printf("removing tag\n")
			tagList[remove] = tagList[len(tagList)-1]
			tagList = tagList[:len(tagList)-1]
		}
	}
	if len(tagList) == 0 {
		fmt.Printf("adding tag\n")
		tagList = append(tagList, Tag{
			Hidden: false,
			Name:   "untagged",
		})
	}
	return tagList
}
