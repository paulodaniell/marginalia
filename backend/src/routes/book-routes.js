const express = require("express");
const router = express.Router();
const authToken = require("../middlewares/auth");
const bookController = require("../controllers/bookController");

router.post("/", authToken, bookController.registerBook);
router.get("/", authToken, bookController.list);
router.get("/:id", authToken, bookController.findById);
router.delete("/:id", authToken, bookController.delete);

module.exports = router;