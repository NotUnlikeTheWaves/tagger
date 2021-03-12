package main

import (
	"io/ioutil"

	"github.com/gin-gonic/gin"
)

func apiFileList(c *gin.Context) {
	files, err := ioutil.ReadDir(getDocumentDir())
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err,
		})
	} else {
		files := createFileList(files)
		c.JSON(200, gin.H{
			"files": files,
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
	tags := GetTags()
	c.JSON(200, gin.H{
		"tags": tags,
	})
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
