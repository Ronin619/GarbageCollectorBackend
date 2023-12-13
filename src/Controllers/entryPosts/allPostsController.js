const Post = require("../../Models/postEntryModel");

// GET: posts by all Users
const getAllEntryPosts = async (req, res) => {
  const allPosts = await Post.find({});

  res.status(200).json(allPosts);
};

module.exports = { getAllEntryPosts };
