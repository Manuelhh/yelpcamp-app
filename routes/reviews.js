var express = require("express");
var router = express.Router({ mergeParams: true });
const reviewsControllers = require("../controllers/reviews");
const validateReview = require("../config/middleware/validateReview");
const isUserAunthenticated = require("../config/middleware/isUserAuthenticated");

router.post(
  "/",
  validateReview,
  isUserAunthenticated,
  reviewsControllers.createAReview
);
router.delete(
  "/:reviewId",
  isUserAunthenticated,
  reviewsControllers.deleteAReview
);

module.exports = router;
