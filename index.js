const express = require("express");
const morgan = require("morgan");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "This Title One",
      snippet: "This is the snippet",
    },
    {
      title: "This Title Two",
      snippet: "This is the snippet",
    },
  ];
  res.render("index", { title: "Home Page", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Page" });
});

app.get("/about-me", (req, res) => {
  res.redirect("/about");
});

app.get("*", (req, res) => {
  res.render("404", { title: "Lost Page" });
});

app.listen(3000, () => {
  console.log("Port running on 3000");
});
