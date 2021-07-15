const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
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
  },

  {
    timestamps: true,
  }
);

blogSchema.pre("save", async function (next) {
  console.log("New Blog is being saved");
  next();
});

blogSchema.post("save", function (doc, next) {
  console.log("Blog is saved successfully");
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
