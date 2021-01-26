package main

import (
	"io/ioutil"
	"net/http"
	"os"
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
		c.JSON(200, gin.H{
			"files": createFileList(files),
		})
	}
}

func apiReadFileStructured(c *gin.Context) {
	fileName := c.Param("path")
	filePath := filepath.Join(getDocumentDir(), fileName)
	result, err := readIniFile(filePath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"content": result, "error": err})
	} else {
		c.JSON(http.StatusOK, gin.H{"content": result, "error": err})
	}
}

func apiReadFileRaw(c *gin.Context) {
	fileName := c.Param("path")
	filePath := filepath.Join(getDocumentDir(), fileName)
	file, err := ioutil.ReadFile(filePath)
	if err != nil {
		c.String(http.StatusNotFound, "No file found named %s.", filePath)
	} else {
		c.String(http.StatusOK, string(file))
	}
}

func apiCloneFile(c *gin.Context) {
	type Clone struct {
		NewName string `form:"newName" json:"newName" xml:"newName" binding:"required"`
	}
	var json Clone
	if err := c.ShouldBindJSON(&json); err != nil {
		c.String(http.StatusBadRequest, "Error: Bad parse of data, fill the field 'newName'")
		return
	}
	documentDir := getDocumentDir()
	originalFileName := c.Param("path")
	newFileName := filepath.Join(documentDir, json.NewName)
	filePath := filepath.Join(documentDir, originalFileName)
	file, err := ioutil.ReadFile(filePath)
	if err != nil {
		c.String(http.StatusNotFound, "No file found named %s.", filePath)
		return
	}
	info, _ := os.Stat(originalFileName)
	ioutil.WriteFile(newFileName, file, info.Mode())
	c.String(http.StatusOK, string(file))
}
