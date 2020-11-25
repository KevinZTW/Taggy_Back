var read = require("node-readability");
var fs = require("fs");
read("https://github.com/luin/readability", function (err, article, meta) {
  // Main Article

  // Title

  // HTML Source Code

  if (article.content) {
    fs.writeFile("read.html", article.content, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }
  // DOM

  // Response Object from Request Lib

  // Close article to clean up jsdom and prevent leaks
  article.close();
});
