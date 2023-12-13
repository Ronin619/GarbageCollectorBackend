const express = require("express");
const router = express.Router();
const userController = require("../../Controllers/user/userController");

router.get("/", userController.findAllUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
