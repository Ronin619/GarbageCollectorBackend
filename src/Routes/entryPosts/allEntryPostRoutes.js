const express = require("express");
const router = express.Router();
const allPostsController = require("../../Controllers/entryPosts/allPostsController");

router.get("/", allPostsController.getAllEntryPosts);

module.exports = router;
