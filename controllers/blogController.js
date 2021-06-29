const Blog = require("../Models/BlogModel");

const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blogs) => res.render("index", { title: "Home", blogs }))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.render("details", { title: blog.title, blog }))
    .catch((err) => console.log(err));
};

const blog_create = (req, res) => {
  res.render("create", { title: "New Blog" });
};

const blog_create_post = (req, res) => {
  Blog.create(req.body)
    .then(res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

module.exports = {
  blog_index,
  blog_details,
  blog_create,
  blog_create_post,
  blog_delete,
};
