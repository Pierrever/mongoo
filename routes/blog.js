const express = require("express");
const db = require("../database");

const mongodb = require("mongodb");

const router = express.Router();

const ObjectId = mongodb.ObjectId;

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getDb().collection("authors").find().toArray();
  console.log(authors);
  res.render("create-post", { authors: authors });
});

router.post("/posts", async (req, res) => {
  const authorId = new ObjectId(req.body.author);
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    date: new Date(),
    author: { id: authorId, name: author.name, email: author.email },
  };
  console.log("heere");
  const result = await db.getDb().collection("posts").insertOne(newPost);
  console.log("heere2");
  res.redirect("/posts");.
});
module.exports = router;
