const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../middleware");
const userPostController = require("../../Controllers/entryPosts/userPostController");

router.use(requireAuth);

router.get("/", userPostController.getAllEntriesByUser);
router.post("/createPost", userPostController.createEntry);
router.patch("/updatePost/:id", userPostController.editEntry);
router.delete("/deletePost/:id", userPostController.deleteEntry);

module.exports = router;
