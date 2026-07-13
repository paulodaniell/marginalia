const express = require('express');
const router = express.Router();
const excerptsController = require('../controllers/excerptsController');
const authToken = require("../middlewares/auth");

router.post("/book/:id", authToken, excerptsController.create);
router.get("/book/:id", authToken, excerptsController.getBybook);

module.exports = router;