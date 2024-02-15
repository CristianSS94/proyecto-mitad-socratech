var express = require("express");
var router = express.Router();
const indexControllers = require("../controllers/indexControllers");
const uploadImage = require("../middlewares/multer");

// VISTA DEl INICIO
router.get("/", indexControllers.viewIndex);

module.exports = router;
