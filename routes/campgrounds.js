var express = require("express");
var router = express.Router();
const campgroundsControllers = require("../controllers/campgrounds");
const validateCampground = require("../config/middleware/validateCampground");

// +++ Middleware section +++

// +++ Routes section +++

router.get("/", campgroundsControllers.getAllCampgrounds);
router.get("/new", campgroundsControllers.getNewCampgroundForm);
router.post("/", validateCampground, campgroundsControllers.createACampground);
router.get("/:id", campgroundsControllers.getOneCampground);
router.get("/:id/edit", campgroundsControllers.editOneCampgroundForm);
router.put(
  "/:id",
  validateCampground,
  campgroundsControllers.editOneCampground
);
router.delete("/:id", campgroundsControllers.deleteOneCampground);

module.exports = router;
