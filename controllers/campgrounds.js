const Campground = require("../models/campground");
const catchAsync = require("./utils/catchAsync");

const getAllCampgrounds = catchAsync(async (req, res, next) => {
  const allCampgrounds = await Campground.Campground.find({});
  res.render("campgrounds/all-campgrounds", {
    allCampgrounds,
  });
});

const getOneCampground = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const oneCampground = await Campground.Campground.findOne({ _id: id });
  res.render("campgrounds/one-campground", {
    oneCampground,
  });
});

const getNewCampgroundForm = catchAsync((req, res, next) => {
  res.render("campgrounds/new-campground-form");
});

const createACampground = catchAsync(async (req, res, next) => {
  const newCampground = await new Campground.Campground(req.body);
  await newCampground.save();
  res.redirect(`/campgrounds/${newCampground._id}`);
});

const editOneCampgroundForm = catchAsync(async (req, res, next) => {
  const campgroundToEdit = await Campground.Campground.findById(req.params.id);
  res.render("campgrounds/edit-campground-form", { campgroundToEdit });
});

const editOneCampground = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const campgroundToEdit = await Campground.Campground.findByIdAndUpdate(
    id,
    req.body
  );
  res.redirect(`/campgrounds/${id}`);
});

const deleteOneCampground = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const campgroundToDelete = await Campground.Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

module.exports = {
  getAllCampgrounds,
  getOneCampground,
  getNewCampgroundForm,
  createACampground,
  editOneCampgroundForm,
  editOneCampground,
  deleteOneCampground,
};
