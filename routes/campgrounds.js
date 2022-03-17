var express = require("express");
var router = express.Router();
const campgroundsControllers = require("../controllers/campgrounds");
const validateCampground = require("../config/middleware/validateCampground");
const isUserAuthenticated = require("../config/middleware/isUserAuthenticated");

// +++ Middleware section +++

// +++ Routes section +++

router.get("/", campgroundsControllers.getAllCampgrounds);
router.get(
  "/new",
  isUserAuthenticated,
  campgroundsControllers.getNewCampgroundForm
);
router.post(
  "/new",
  isUserAuthenticated,
  validateCampground,
  campgroundsControllers.createACampground
);
router.get("/:id", campgroundsControllers.getOneCampground);
router.get(
  "/:id/edit",
  isUserAuthenticated,
  campgroundsControllers.editOneCampgroundForm
);
router.put(
  "/:id",
  isUserAuthenticated,
  validateCampground,
  campgroundsControllers.editOneCampground
);
router.delete(
  "/:id",
  isUserAuthenticated,
  campgroundsControllers.deleteOneCampground
);

module.exports = router;
