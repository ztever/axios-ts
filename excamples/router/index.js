const router = require("express").Router();

router.get("/simple/get", (req, res) => {
  res.json({
    message: "hello world",
  });
});
router.get("/get/base", (req, res) => {
  res.json(req.query);
});
router.post("/post/base", (req, res) => {
  res.json(req.body);
});
router.post("/post/base/buffer", (req, res) => {
  const msg = [];
  req.on("data", (chunk) => {
    chunk && msg.push(chunk);
  });
  req.on("end", () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
});

module.exports = router;
