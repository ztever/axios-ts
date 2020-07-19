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
router.get("/generics/user", (req, res) => {
  res.json({
    name: "zt",
    age: 12
  });
});
router.get("/interface/get", (req, res) => {
  res.json(req.query);
});
router.post("/interface/post", (req, res) => {
  res.json(req.body);
});
router.post("/interface/request", (req, res) => {
  res.json(req.body);
});

module.exports = router;
