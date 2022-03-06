const req = require("express/lib/request");
const Campground = require("../models/campground");
const createError = require("http-errors");

const getAllCampgrounds = async (req, res, next) => {
  try {
    const allCampgrounds = await Campground.Campground.find({});
    res.render("campgrounds/all-campgrounds", {
      allCampgrounds,
    });
  } catch (error) {
    next(createError(500, error));
  }
};

const getOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneCampground = await Campground.Campground.findOne({ _id: id });
    res.render("campgrounds/one-campground", {
      oneCampground,
    });
  } catch (error) {
    next(createError(400, "ID not found"));
  }
};

const getNewCampgroundForm = (req, res, next) => {
  res.render("campgrounds/new-campground-form");
};

const createACampground = async (req, res, next) => {
  try {
    const newCampground = await new Campground.Campground(req.body);
    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
  } catch (error) {
    next(createError(500, error));
  }
};

const editOneCampgroundForm = async (req, res, next) => {
  try {
    const campgroundToEdit = await Campground.Campground.findById(
      req.params.id
    );
    res.render("campgrounds/edit-campground-form", { campgroundToEdit });
  } catch (error) {
    next(createError(500, error));
  }
};

const editOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campgroundToEdit = await Campground.Campground.findByIdAndUpdate(
      id,
      req.body
    );
    res.redirect(`/campgrounds/${id}`);
  } catch (error) {
    next(createError(500, error));
  }
};

const deleteOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campgroundToDelete = await Campground.Campground.findByIdAndDelete(
      id
    );
    res.redirect("/campgrounds");
  } catch (error) {
    next(createError(500, error));
  }
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
