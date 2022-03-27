const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedhelpers");

require("../config/database");

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "6239df973d86c4e872b10f5a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/mangud/image/upload/v1648316582/Yelpcamp/ykq2mn7cpn0wsregxeq1.jpg",
          filename: "Yelpcamp/ykq2mn7cpn0wsregxeq1",
        },
        {
          url: "https://res.cloudinary.com/mangud/image/upload/v1648316582/Yelpcamp/dnhov2lq26lplnkqj0fn.jpg",
          filename: "Yelpcamp/dnhov2lq26lplnkqj0fn",
        },
        {
          url: "https://res.cloudinary.com/mangud/image/upload/v1648316582/Yelpcamp/tgcrycil7ii3ubpp1kvf.png",
          filename: "Yelpcamp/tgcrycil7ii3ubpp1kvf",
        },
      ],
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, at maiores dolorem dolore animi temporibus facere iure labore laboriosam veniam alias porro laudantium optio itaque ipsam odit magnam illo ad!",
      price: price,
    });
    await camp.save();
  }
};

seedDb();
