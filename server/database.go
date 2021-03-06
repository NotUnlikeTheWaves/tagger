package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func initDb() {
	fmt.Println("Init db")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var err error
	client, err = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017").SetAuth(options.Credential{
		Username: "root",
		Password: "example",
	}))
	if err != nil {
		fmt.Printf("Error while trying to instantiate DB connection: %s", err.Error())
		os.Exit(0)
	}
	dbs, err := client.ListDatabaseNames(ctx, bson.D{})
	for _, db := range dbs {
		fmt.Printf("db found: %s\n", db)
	}
	fmt.Println("Init db done.")
}
