const Campground = require("../models/campground");

const getAllCampgrounds = async (req, res, next) => {
  const allCampgrounds = await Campground.Campground.find({});
  res.render("campgrounds/all-campgrounds", {
    allCampgrounds,
  });
};

const getOneCampground = async (req, res, next) => {
  const { id } = req.params;
  const oneCampground = await Campground.Campground.findOne({ _id: id });
  res.render("campgrounds/one-campground", {
    oneCampground,
  });
};

const getNewCampgroundForm = (req, res, next) => {
  res.render("campgrounds/new-campground-form");
};

module.exports = {
  getAllCampgrounds,
  getOneCampground,
  getNewCampgroundForm,
};
