package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)


func main() {
	documentDir := getDocumentDir()
	initDocumentDirectory(documentDir)

	// Set up Gin stuff
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/api/v1/filelist", apiFileList)
	r.GET("/api/v1/file/:path", apiReadFileStructured)
	r.GET("/api/v1/file/:path/raw", apiReadFileRaw)
	r.POST("/api/v1/file/:path/clone", apiCloneFile)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

