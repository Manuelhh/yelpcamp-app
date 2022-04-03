const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
// "mongodb://localhost:27017/yelp-camp"
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
