const express = require("express");
const router = express.Router();

const authToken = require("../middlewares/auth");
const bookController = require("../controllers/bookController");

router.post("/register",authToken,bookController.registerBook);
router.get("/list",authToken,bookController.list);
router.get("/find/:id",authToken,bookController.findById);

module.exports = router;