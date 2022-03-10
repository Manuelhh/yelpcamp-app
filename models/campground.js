const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("../models/review");

const CampgroundSchema = new Schema({
  title: String,
  image: String,
  price: Number,
  description: String,
  location: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Campground = mongoose.model("Campground", CampgroundSchema);

CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = {
  Campground,
};
