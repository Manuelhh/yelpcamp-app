var express = require("express");
var router = express.Router({ mergeParams: true });
const reviewsControllers = require("../controllers/reviews");
const validateReview = require("../config/middleware/validateReview");

router.post("/", validateReview, reviewsControllers.createAReview);
router.delete("/:reviewId", reviewsControllers.deleteAReview);

module.exports = router;
