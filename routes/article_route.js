const router = require("express").Router();
const path = require("path");
const { getArticle } = require("../controllers/article_controller");
router.route("/article/import").post((req, res) => {
  console.log(req.body.url);
  let msg = getArticle(req.body.url);
  res.status(200).json({ msg: "data sucessfully save in backend" });
});
router.route("/article/before").get((req, res) => {
  console.log(__dirname + "/../index.html");
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/../articles/before.html"));
});
router.route("/article/after").get((req, res) => {
  console.log(__dirname + "/../articles/after.html");
  res.status(200).sendFile(path.resolve(__dirname + "/../articles/after.html"));
});
router.route("/article/MD").get((req, res) => {
  let msg = getArticle(req.body.url);
  res
    .status(200)
    .sendFile(path.resolve(__dirname + "/../articles/markdown.md"));
});
module.exports = router;
