const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/yelp-camp";

// const dbUrl = process.env.DB_URL;

mongoose
  .connect(dbUrl, {
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
