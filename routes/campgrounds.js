var express = require("express");
var router = express.Router();
const campgroundsControllers = require("../controllers/campgrounds");
const validateCampground = require("../config/middleware/validateCampground");
const isUserAuthenticated = require("../config/middleware/isUserAuthenticated");
const isAuthor = require("../config/middleware/isAuthor");

// +++ Middleware section +++

// +++ Routes section +++

router.get("/", campgroundsControllers.getAllCampgrounds);

router
  .route("/new")
  .get(isUserAuthenticated, campgroundsControllers.getNewCampgroundForm)
  .post(
    isUserAuthenticated,
    validateCampground,
    campgroundsControllers.createACampground
  );

router
  .route("/:id")
  .get(campgroundsControllers.getOneCampground)
  .put(
    isUserAuthenticated,
    isAuthor,
    validateCampground,
    campgroundsControllers.editOneCampground
  )
  .delete(
    isUserAuthenticated,
    isAuthor,
    campgroundsControllers.deleteOneCampground
  );

router.get(
  "/:id/edit",
  isUserAuthenticated,
  isAuthor,
  campgroundsControllers.editOneCampgroundForm
);

module.exports = router;
