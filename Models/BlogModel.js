const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    unique: true,
  },
  snippet: {
    type: String,
    required: [true, "Snippet Is required"],
  },
  body: {
    type: String,
    required: [true, "Body Is required"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
