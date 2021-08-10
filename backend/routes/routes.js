const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/user.controler");

router
  .post("/newUser", (req, res) => {
    userController.createNewUser(req, res);
  })
  .post("/login", (req, res) => {
    userController.login(req, res);
  })
  .post("/logout", auth, (req, res) => {
    userController.logout(req, res);
  })
  .put("/update", auth, (req, res) => {
    userController.update(req, res);
  });

module.exports = router;
