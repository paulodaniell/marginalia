const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authToken = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/search", authToken, userController.findByName);
router.put("/profile", authToken, userController.update);
router.delete("/profile", authToken, userController.delete);

module.exports = router;