#!/bin/bash

set -e

mongosh <<-EOJS
  db = db.getSiblingDB("admin");

  db.auth("$MONGO_INITDB_ROOT_USERNAME", "$MONGO_INITDB_ROOT_PASSWORD");

  db = db.getSiblingDB("$MONGO_INITDB_DATABASE");

  db.createUser({
    user: "$MONGO_USER",
    pwd: "$MONGO_PASSWORD",
    roles: [
      {
        role: "readWrite",
        db: "$MONGO_INITDB_DATABASE",
      },
    ],
  });

  db.createCollection("$MONGO_INITDB_COLLECTION");
EOJS
