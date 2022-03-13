const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Serving realness");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection falied");
  });
