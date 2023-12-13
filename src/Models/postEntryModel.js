const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postEntrySchema = new schema(
  {
    author: {
      type: schema.Types.ObjectId,
      ref: "usersModel",
    },
    title: {
      type: String,
      required: true,
    },
    postEntry: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("postEntryModel", postEntrySchema);
