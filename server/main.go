package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	documentDir := getDocumentDir()
	initDocumentDirectory(documentDir)
	initDb()

	// Set up Gin stuff
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/v1/contentList", apiFileList)
	r.GET("/api/v1/tagList", apiTagList)
	r.PATCH("/api/v1/tags/:fileName", apiPatchTags)
	r.Static("/api/v1/content", "./documents")
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
