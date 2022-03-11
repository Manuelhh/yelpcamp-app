const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection open");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection falied");
  });
