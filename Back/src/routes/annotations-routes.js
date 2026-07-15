const express = require('express');
const router = express.Router();
const annotationController = require('../controllers/annotationController');
const authToken = require("../middlewares/auth");

router.post("/excerpt/:excerptId", authToken, annotationController.create);
router.get("/excerpt/:excerptId", authToken, annotationController.getByExcerptID);
router.post("/excerpt/:excerptId/reply/:id", authToken, annotationController.reply);
router.delete("/:id", authToken, annotationController.delete);

module.exports = router;