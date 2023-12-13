require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 8080;
const mongoURL = process.env.DATABASE_URL;

const userRoutes = require("./Routes/users/userRoutes");
//const userEntryPostRoutes = require("./Routes/entryPosts/userEntryPostRoutes");
const allEntryPostRoutes = require("./Routes/entryPosts/allEntryPostRoutes");

//middleware
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
//app.use("/userEntryPost", userEntryPostRoutes);
//app.use("/allEntryPosts", allEntryPostRoutes);

//connect to the database
mongoose
  .connect(mongoURL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

module.exports = app;
