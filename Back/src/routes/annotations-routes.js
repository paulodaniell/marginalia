const express = require('express');
const router = express.Router();
const annotationController = require('../controllers/annotationController');
const authToken = require("../middlewares/auth");


router.post("/excerpt/:excerptId", authToken, annotationController.create);

module.exports = router;