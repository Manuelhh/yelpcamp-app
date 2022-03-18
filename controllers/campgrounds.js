const createError = require("http-errors");
const Campground = require("../models/campground");

const getAllCampgrounds = async (req, res, next) => {
  try {
    const allCampgrounds = await Campground.find({});
    res.render("campgrounds/all-campgrounds", {
      allCampgrounds,
    });
  } catch (error) {
    next(createError(500, error));
  }
};

// here

const getOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneCampground = await Campground.findOne({
      _id: id,
    }).populate("reviews");
    if (!oneCampground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/one-campground", {
      oneCampground,
    });
  } catch (error) {
    next(createError(500, "ID not found"));
  }
};

const getNewCampgroundForm = (req, res, next) => {
  res.render("campgrounds/new-campground-form");
};

const createACampground = async (req, res, next) => {
  try {
    const newCampground = await new Campground(req.body);
    await newCampground.save();
    req.flash("success", "Succesfully made a new campground");
    res.redirect(`/campgrounds/${newCampground._id}`);
  } catch (error) {
    next(createError(400, error));
  }
};

const editOneCampgroundForm = async (req, res, next) => {
  try {
    const campgroundToEdit = await Campground.findById(req.params.id);
    if (!campgroundToEdit) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit-campground-form", { campgroundToEdit });
  } catch (error) {
    next(createError(500, error));
  }
};

const editOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campgroundToEdit = await Campground.findByIdAndUpdate(id, req.body);
    req.flash(
      "success",
      `Succesfully edited ${campgroundToEdit.title} campground`
    );
    res.redirect(`/campgrounds/${id}`);
  } catch (error) {
    next(createError(400, error + ". Make sure the price field is a number"));
  }
};

const deleteOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const campgroundToDelete = await Campground.findOneAndDelete(id);
    req.flash("success", "Campground succesfully deleted");
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
