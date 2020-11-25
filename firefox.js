var { Readability } = require("@mozilla/readability");
var TurndownService = require("turndown");
var turndownService = new TurndownService();
var JSDOM = require("jsdom").JSDOM;
var fs = require("fs");
const axios = require("axios");
let url = "https://github.com/luin/readability";

axios
  .get(url)
  .then((response) => {
    console.log(response.data.url);
    var doc = new JSDOM(response.data, {
      url: "https://www.npmjs.com/package/jsdom",
    });

    fs.writeFile("before.html", response.data, function (err) {
      if (err) {
        return console.log(err);
      }
    });

    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    fs.writeFile("after.html", article.content, function (err) {
      if (err) {
        return console.log(err);
      }
    });

    var markdown = turndownService.turndown(article.content);
    fs.writeFile("markdown.md", markdown, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
