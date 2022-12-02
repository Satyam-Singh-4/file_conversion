const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./Router/router");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

//server started
app.listen(4000, () => {
  console.log("server is listening on post no:", 4000);
});
