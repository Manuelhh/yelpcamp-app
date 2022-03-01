var express = require("express");
var router = express.Router();
const campgroundsControllers = require("../controllers/campgrounds");

router.get("/", campgroundsControllers.getAllCampgrounds);
router.get("/new", campgroundsControllers.getNewCampgroundForm);
router.post("/", campgroundsControllers.createACampground);
router.get("/:id", campgroundsControllers.getOneCampground);
router.get("/:id/edit", campgroundsControllers.editOneCampgroundForm);
router.put("/:id/", campgroundsControllers.editOneCampground);
router.delete("/:id", campgroundsControllers.deleteOneCampground);

module.exports = router;
