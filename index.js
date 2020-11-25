var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());

app.use("/route", [require("./routes/article_route")]);

app.listen(2000, () => {
  console.log("port run on 2000");
});
