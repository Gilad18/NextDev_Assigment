const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const path = require("path");

app.use(cors());
const port = process.env.PORT || 5001;

const serverRoute = require("./backend/routes/routes");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/server/api", serverRoute);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster1.d82yt.mongodb.net/nextDev`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("database connect");
  });

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));

  app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./frontend/build/index.html"),
      function (err) {
        if (err) {
          res.status(500).send(err);
        }
      }
    );
  });
}

app.listen(port, () => {
  return console.log(`application start`);
});
