var express = require("express");
var router = express.Router();
const campgroundsControllers = require("../controllers/campgrounds");

router.get("/", campgroundsControllers.getAllCampgrounds);
router.get("/new", campgroundsControllers.getNewCampgroundForm);
router.get("/:id", campgroundsControllers.getOneCampground);

module.exports = router;
