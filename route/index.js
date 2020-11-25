var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());
app.post("/add", (req, res) => {
  console.log(req.body);
  res.status(200).json({ content: "hello worldhere is backend" });
});

app.get("/", (req, res) => {
  res.send("hello world here is backend");
});

app.listen(2000, () => {
  console.log("port run on 2000");
});
