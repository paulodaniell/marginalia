const express = require('express');
const router = express.Router();
const authToken = require("../middlewares/auth");

const userController = require('../controllers/userController');


router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/search", authToken, userController.findByName);
router.put("/profile", authToken, userController.update);
router.delete("/profile", authToken, userController.delete);