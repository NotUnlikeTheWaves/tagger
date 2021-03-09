package main

import (
	"context"
	"fmt"
	"os"

	"github.com/qiniu/qmgo"
)

var client *qmgo.Client

func initDb() {
	fmt.Println("Init db")

	ctx := context.Background()
	var err error
	client, err = qmgo.NewClient(ctx, &qmgo.Config{
		Uri: "mongodb://localhost:27017",
		Auth: &qmgo.Credential{
			Password: "examsple",
			Username: "root",
		},
	})

	if err != nil {
		fmt.Printf("Error while init mongo: %v", err)
		fmt.Println("Exiting...")
		os.Exit(0)
	}

	fmt.Println("Init db done.")
}
