import { Readability } from "@mozilla/readability";
import TurndownService from "turndown";
var turndownService = new TurndownService();
import { JSDOM } from "jsdom";
import * as fs from "fs";
import axios from "axios";
import { addArticle } from "../models/article_model.js";

const getArticle = function (url) {
  axios
    .get(url)
    .then((response) => {
      var doc = new JSDOM(response.data, {
        url: url,
      });

      let reader = new Readability(doc.window.document);
      let article = reader.parse();
      console.log(article.title);
      // fs.writeFile(
      //   __dirname + "/../articles/after.html",
      //   article.content,
      //   function (err) {
      //     if (err) {
      //       return console.log(err);
      //     }
      //   }
      // );

      var markdown = turndownService.turndown(article.content);
      addArticle(article.title, markdown);
    })
    .catch((error) => {
      console.log(error);
    });
};
getArticle(
  "https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Default_parameters#:~:text=%E5%9C%A8%20JavaScript%20%E4%B8%AD%EF%BC%8C%E5%87%BD%E5%BC%8F,%E8%A8%AD%E5%80%BC%E9%83%BD%E7%82%BA%20undefined%20%E3%80%82"
);
export { getArticle };
