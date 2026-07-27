const express = require('express');
const router = express.Router();
const excerptsController = require('../controllers/excerptsController');
const authToken = require("../middlewares/auth");

router.post("/book/:id", authToken, excerptsController.create);
router.get("/book/:id", authToken, excerptsController.getBybook);
router.delete("/:id", authToken, excerptsController.delete);
router.get("/:id", authToken, excerptsController.getByExcerpts);
module.exports = router;