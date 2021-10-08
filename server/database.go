package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/qiniu/qmgo"
	"gopkg.in/mgo.v2/bson"
)

var client *qmgo.Client
var ctx context.Context

// Internal representation of DB document.
type DbDocument struct {
	Name         string    `bson:"Name"`
	Tags         []Tag     `bson:"Tags"`
	DateCreated  time.Time `bson:"DateCreated"`
	DateModified time.Time `bson:"DateModifed"`
}

func initDb() {
	fmt.Println("Init db")

	ctx = context.Background()
	var err error
	client, err = qmgo.NewClient(ctx, &qmgo.Config{
		Uri: "mongodb://mongo:27017",
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

func findTags(filters []Tag) []Tag {
	db := client.Database("tagger")
	coll := db.Collection("documents")

	mongoFilter := createMongoTagFilter(filters)

	returnTags := []Tag{}
	coll.Aggregate(ctx, []bson.M{
		{
			"$match": mongoFilter,
		},
		{
			"$unwind": "$Tags",
		},
		{
			"$group": bson.M{
				"_id": "$Tags",
			},
		},
		{
			"$project": bson.M{
				"_id":    0,
				"Name":   "$_id.Name",
				"Hidden": "$_id.Hidden",
			},
		},
	}).All(&returnTags)
	return returnTags
}

func createMongoTagFilter(filters []Tag) bson.M {
	var mongoFilter []bson.M
	// Add a 1=1
	mongoFilter = append(mongoFilter, bson.M{
		"$expr": bson.M{
			"$eq": []int{1, 1},
		},
	})
	for _, filter := range filters {
		mongoFilter = append(mongoFilter, bson.M{
			"Tags": bson.M{"$elemMatch": filter},
		})
	}
	return bson.M{"$and": mongoFilter}
}

func findDocuments(filters []Tag) []DbDocument {
	db := client.Database("tagger")
	coll := db.Collection("documents")
	var documents []DbDocument
	mongoFilter := createMongoTagFilter(filters)
	coll.Find(ctx, mongoFilter).Sort("-DateCreated").All(&documents)
	return documents
}

func findDocument(name string) (DbDocument, error) {
	db := client.Database("tagger")
	coll := db.Collection("documents")
	doc := DbDocument{}
	fmt.Printf("Trying to find document with name %s\n", name)
	err := coll.Find(ctx, bson.M{"Name": name}).One(&doc)
	if err != nil {
		// If the doc doesn't exist, create it
		if err.Error() == qmgo.ErrNoSuchDocuments.Error() {
			doc = DbDocument{
				Name: name,
				Tags: []Tag{
					{
						Name:   "untagged",
						Hidden: false,
					},
				},
				DateCreated:  time.Now(),
				DateModified: time.Now(),
			}
			coll.InsertOne(ctx, doc)
			return doc, nil
		}
		// Otherwise something else went wrong.
		return doc, err
	}
	return doc, nil
}

func updateDocument(document Document) error {
	db := client.Database("tagger")
	coll := db.Collection("documents")

	dbDoc := DbDocument{
		Tags:         document.Tags,
		Name:         document.Name,
		DateModified: time.Now(),
		DateCreated:  document.DateCreated,
	}

	err := coll.UpdateOne(ctx, bson.M{"Name": document.Name}, bson.M{
		"$set": dbDoc,
	})
	return err
}
