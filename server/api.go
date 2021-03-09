package main

import (
	"fmt"
	"io/ioutil"
	"path/filepath"

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
		for i := range files {
			files[i].Url = fmt.Sprintf("/api/v1/content/%s", files[i].Name)
		}
		c.JSON(200, gin.H{
			"files": files,
		})
	}
}

func apiGetDocument(c *gin.Context) {
	fileName := c.Param("fileName")
	filePath := filepath.Join(getDocumentDir(), fileName)
	exists, err := fileExists(filePath)
	if exists == false {
		c.JSON(400, gin.H{
			"msg": "Document not found",
		})
		return
	}
	if err != nil {
		c.JSON(400, gin.H{
			"msg": err.Error(),
		})
		return
	}

	document, err := findDocument(fileName)
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

func apiPatchTags(c *gin.Context) {
	fileName := c.Param("fileName")
	filePath := filepath.Join(getDocumentDir(), fileName)
	exists, err := fileExists(filePath)
	if exists == false {
		c.JSON(400, gin.H{
			"msg": err,
		})
	}

}
