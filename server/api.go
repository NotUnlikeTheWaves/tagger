package main

import (
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/gin-gonic/gin"
)

func apiFileList(c *gin.Context) {
	files, err := ioutil.ReadDir(getDocumentDir())
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err,
		})
	} else {
		httpFilters := c.QueryArray("filter")
		filters := getFiltersFromQueryArray(httpFilters)
		dbDocuments := findDocuments(filters)
		var filteredDocuments []Document
		for _, dbDoc := range dbDocuments {
			for _, fileDoc := range files {
				if fileDoc.Name() == dbDoc.Name {
					document := mergeDbDocWithFileDoc(dbDoc, fileDoc)
					filteredDocuments = append(filteredDocuments, document)
					break
				}
			}
		}
		c.JSON(200, gin.H{
			"files": filteredDocuments,
		})
	}
}

func apiGetDocument(c *gin.Context) {
	document, err := retrieveDocumentFromFileName(c.Param("fileName"))
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{
		"doc": document,
	})
}

func apiTagList(c *gin.Context) {
	httpFilters := c.QueryArray("filter")
	filters := getFiltersFromQueryArray(httpFilters)
	tags := findTags(filters)
	c.JSON(200, gin.H{
		"tags": tags,
	})
}

func apiRefresh(c *gin.Context) {
	files, err := ioutil.ReadDir(getDocumentDir())
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err,
		})
	}
	createFileList(files)
	c.JSON(200, gin.H{
		"msg": "Success",
	})
}

func getFiltersFromQueryArray(queryArray []string) []Tag {
	var filters []Tag
	for _, v := range queryArray {
		split := strings.SplitN(v, "|", 2)
		if len(split) != 2 {
			fmt.Printf("Couldn't parse tagList filter: %s", v)
			continue
		}
		filters = append(filters, Tag{
			Hidden: split[0] == "1",
			Name:   split[1],
		})
	}
	return filters
}

func apiAddTags(c *gin.Context) {
	fileName := c.Param("fileName")
	document, err := retrieveDocumentFromFileName(fileName)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	var tags []Tag
	err = c.BindJSON(&tags)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	for _, tagToAdd := range tags {
		skip := false
		for _, existingTag := range document.Tags {
			if existingTag.Name == tagToAdd.Name &&
				existingTag.Hidden == tagToAdd.Hidden {
				skip = true
			}
		}
		if skip == false {
			document.Tags = append(document.Tags, tagToAdd)
		}
	}
	err = updateDocument(document)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	c.JSON(200, document)
}

func apiRemoveTags(c *gin.Context) {
	fileName := c.Param("fileName")
	document, err := retrieveDocumentFromFileName(fileName)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	var tags []Tag
	err = c.BindJSON(&tags)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	for _, tagToRemove := range tags {
		remove := -1
		for i, existingTag := range document.Tags {
			if existingTag.Name == tagToRemove.Name &&
				existingTag.Hidden == tagToRemove.Hidden {
				remove = i
			}
		}
		if remove != -1 {
			document.Tags[remove] = document.Tags[len(document.Tags)-1]
			document.Tags = document.Tags[:len(document.Tags)-1]
		}
	}
	err = updateDocument(document)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}
	c.JSON(200, document)
}
