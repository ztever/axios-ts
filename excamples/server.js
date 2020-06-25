const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const router = require("./router");
const app = express();
const path = require("path");
const compiler = webpack(webpackConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: "/dist/",
    stats: {
      colors: true,
      chunks: false,
    },
  })
);

app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.resolve(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running @127.0.0.1:", port);
});
