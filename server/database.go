package main

import (
	"context"
	"fmt"
	"os"

	"github.com/qiniu/qmgo"
	"gopkg.in/mgo.v2/bson"
)

var client *qmgo.Client
var ctx context.Context

func initDb() {
	fmt.Println("Init db")

	ctx = context.Background()
	var err error
	client, err = qmgo.NewClient(ctx, &qmgo.Config{
		Uri: "mongodb://localhost:27017",
		Auth: &qmgo.Credential{
			Password: "example",
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

func findTags() []Tag {
	db := client.Database("tagger")
	coll := db.Collection("tags")
	tags := []Tag{}
	coll.Find(ctx, bson.M{}).All(&tags)
	return tags
}

func findDocument(name string) (Document, error) {
	db := client.Database("tagger")
	coll := db.Collection("documents")
	doc := Document{}
	fmt.Printf("Trying to find document with name %s\n", name)
	err := coll.Find(ctx, bson.M{"Name": name}).One(&doc)
	if err != nil {
		return Document{}, err
	}
	return doc, nil
}
