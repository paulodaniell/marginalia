const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likesController');
const authToken = require("../middlewares/auth");

router.post("/annotations/:id/like", authToken, likesController.create);
router.delete("/annotations/:id/like", authToken, likesController.delete);

module.exports = router;