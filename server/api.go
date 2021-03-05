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

func apiTagList(c *gin.Context) {
	tags := [...]string{"outer-words", "games", "vidya", "foo", "bar"}
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
