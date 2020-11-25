var { Readability } = require("@mozilla/readability");
var TurndownService = require("turndown");
var turndownService = new TurndownService();
var JSDOM = require("jsdom").JSDOM;
var fs = require("fs");
const axios = require("axios");

const getArticle = function (url) {
  axios
    .get(url)
    .then((response) => {
      console.log(response.data.url);
      var doc = new JSDOM(response.data, {
        url: url,
      });

      fs.writeFile(
        __dirname + "/../articles/before.html",
        response.data,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );

      let reader = new Readability(doc.window.document);
      let article = reader.parse();
      console.log(article.title);
      fs.writeFile(
        __dirname + "/../articles/after.html",
        article.content,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );

      var markdown = turndownService.turndown(article.content);
      fs.writeFile(
        __dirname + "/../articles/markdown.md",
        markdown,
        function (err) {
          if (err) {
            return console.log(err);
          }
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = { getArticle };
