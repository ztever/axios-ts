const router = require("express").Router();

router.get("/simple/get", (req, res) => {
  res.json({
    message: "hello world"
  });
});
router.get("/get/base", (req, res) => {
  res.json(req.query);
});
router.get("/get/error", (req, res) => {
  res.status(500);
  res.json({ error: "error" });
});
router.post("/post/base", (req, res) => {
  res.json(req.body);
});
router.post("/post/timeout", (req, res) => {
  setTimeout(() => {
    res.json(req.body);
  }, 3000);
});
router.post("/post/base/buffer", (req, res) => {
  const msg = [];
  req.on("data", chunk => {
    chunk && msg.push(chunk);
  });
  req.on("end", () => {
    const buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
});

module.exports = router;
