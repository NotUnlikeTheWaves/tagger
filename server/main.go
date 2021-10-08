package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
)

func main() {
	config := Config{}
	err := envconfig.Process("Tagger", &config)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	documentDir := getDocumentDir()
	initDocumentDirectory(documentDir)
	initDb(config)

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

type Config struct {
	MongoHost string `default:"localhost"`
	MongoPort int    `default:"27017"`
	MongoUser string `default:"root"`
	MongoPass string `default:"example"`
}
