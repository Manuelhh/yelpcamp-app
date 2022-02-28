const mongoose = require("mongoose");
const Campground = require("../models/campground");
require("../config/database");

const C = new Campground.Campground({
  title: "test",
  price: "test",
  description: "test",
  location: "test",
});
