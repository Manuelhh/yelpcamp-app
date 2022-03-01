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

const createACampground = async (req, res, next) => {
  const newCampground = await new Campground.Campground(req.body);
  await newCampground.save();
  res.redirect(`/campgrounds/${newCampground._id}`);
};

const editOneCampgroundForm = async (req, res, next) => {
  const campgroundToEdit = await Campground.Campground.findById(req.params.id);
  res.render("campgrounds/edit-campground-form", { campgroundToEdit });
};

const editOneCampground = async (req, res, next) => {
  const { id } = req.params;
  const campgroundToEdit = await Campground.Campground.findByIdAndUpdate(
    id,
    req.body
  );
  res.redirect(`/campgrounds/${id}`);
};

const deleteOneCampground = async (req, res, next) => {
  const { id } = req.params;
  const campgroundToDelete = await Campground.Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
};

module.exports = {
  getAllCampgrounds,
  getOneCampground,
  getNewCampgroundForm,
  createACampground,
  editOneCampgroundForm,
  editOneCampground,
  deleteOneCampground,
};
