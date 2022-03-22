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

const getOneCampground = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneCampground = await Campground.findOne({
      _id: id,
    })
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("author");

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
    newCampground.images = req.files.map((f) => ({
      url: f.path,
      filename: f.filename,
    }));
    newCampground.author = req.user._id;
    await newCampground.save();
    console.log(newCampground);
    req.flash("success", "Succesfully made a new campground");
    res.redirect(`/campgrounds/${newCampground._id}`);
  } catch (error) {
    next(createError(400, error));
  }
};

const editOneCampgroundForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    }

    res.render("campgrounds/edit-campground-form", { campground });
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
