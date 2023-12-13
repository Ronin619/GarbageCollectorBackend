const Entry = require("../../Models/postEntryModel");

// Get: Get all entries by user
const getAllEntriesByUser = async (req, res) => {
  const userId = req.userId;
  const AllUsersPosts = await Entry.find({}).where({ author: userId });

  res.status(200).json(AllUsersPosts);
};

// POST:Create a new entry
const createEntry = async (req, res) => {
  try {
    const user_id = req.userId;
    const entry = await Entry.create({
      title: req.body.title,
      postEntry: req.body.postEntry,
      author: user_id,
    });
    res.status(200).json(entry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

// PATCH: Edit a users Entry
const editEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const update = await Entry.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(update);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteEntry = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Entry.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = { getAllEntriesByUser, createEntry, editEntry, deleteEntry };
