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

// Internal representation of DB document.
type DbDocument struct {
	Name string `bson:"Name"`
	Tags []Tag  `bson:"Tags"`
}

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
	coll := db.Collection("documents")
	tags := []Tag{}
	coll.Aggregate(ctx, []bson.M{
		bson.M{
			"$unwind": "$Tags",
		},
		bson.M{
			"$group": bson.M{
				"_id": "$Tags",
			},
		},
		bson.M{
			"$project": bson.M{
				"_id":    0,
				"Name":   "$_id.Name",
				"Hidden": "$_id.Hidden",
			},
		},
	}).All(&tags)
	return tags
}

func findDocumentTags(name string) ([]Tag, error) {
	db := client.Database("tagger")
	coll := db.Collection("documents")
	doc := DbDocument{}
	fmt.Printf("Trying to find document with name %s\n", name)
	err := coll.Find(ctx, bson.M{"Name": name}).One(&doc)
	if err != nil {
		// If the doc doesn't exist, create it
		if err.Error() == qmgo.ErrNoSuchDocuments.Error() {
			coll.InsertOne(ctx, DbDocument{
				Name: name,
				Tags: []Tag{},
			})
			return []Tag{}, nil
		}
		// Otherwise something else went wrong.
		return []Tag{}, err
	}
	return doc.Tags, err
}

func updateDocument(document Document) error {
	db := client.Database("tagger")
	coll := db.Collection("documents")

	dbDoc := DbDocument{
		Tags: document.Tags,
		Name: document.Name,
	}

	err := coll.UpdateOne(ctx, bson.M{"Name": document.Name}, bson.M{
		"$set": dbDoc,
	})
	return err
}
