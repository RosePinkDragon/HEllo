const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const blogRoutes = require("./routes/blogRoutes");
const app = express();

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(process.env.PORT, () => {
      console.log(`Port running on ${process.env.PORT}`);
    })
  )
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.get("*", (req, res) => {
  res.render("404", { title: "Lost Page" });
});
