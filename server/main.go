package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

func main() {
	documentDir := getDocumentDir()
	initDocumentDirectory(documentDir)
	initDb()

	// Set up Gin stuff
	r := gin.Default()
	r.Use(cors.Default())
	// 50 MB upload max
	// todo: put this in a config
	r.MaxMultipartMemory = 50 << 20

	r.GET("/api/v1/contentList", apiContentList)
	r.GET("/api/v1/tagList", apiTagList)
	r.GET("/api/v1/document/:fileName", apiGetDocument)
	r.POST("/api/v1/document/:fileName/tags", apiAddTags)
	r.POST("/api/v1/refresh", apiRefresh)
	r.POST("/api/v1/document", apiUploadFiles)
	r.DELETE("/api/v1/document/:fileName/tags", apiRemoveTags)
	r.Static("/api/v1/content", "./documents")
	r.Use(static.Serve("/", static.LocalFile("../web/build", true)))
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
