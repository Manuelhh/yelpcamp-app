var express = require("express");
var router = express.Router();
const campgroundsControllers = require("../controllers/campgrounds");
const validateCampground = require("../config/middleware/validateCampground");
const validateReview = require("../config/middleware/validateReview");

router.get("/", campgroundsControllers.getAllCampgrounds);
router.get("/new", campgroundsControllers.getNewCampgroundForm);
router.post("/", validateCampground, campgroundsControllers.createACampground);
router.get("/:id", campgroundsControllers.getOneCampground);
router.post(
  "/:id/reviews",
  validateReview,
  campgroundsControllers.createAReview
);
router.delete("/:id/reviews/:reviewId", campgroundsControllers.deleteAReview);

router.get("/:id/edit", campgroundsControllers.editOneCampgroundForm);
router.put(
  "/:id/",
  validateCampground,
  campgroundsControllers.editOneCampground
);
router.delete("/:id", campgroundsControllers.deleteOneCampground);

module.exports = router;
