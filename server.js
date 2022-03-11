//  used for generating errors for express apps.js:
var createError = require("http-errors");
// express framework:
var express = require("express");
// provides a lot of very useful functionality to access and interact with the file system:
var path = require("path");
// middleware which parses cookies attached to the client request object:
var cookieParser = require("cookie-parser");
// A simple multi-level logger for console, file, and rolling file appenders.
var logger = require("morgan");
// To be able to use all kinds of http requests:
const methodOverride = require("method-override");
// ???
const ejsMate = require("ejs-mate");
// to comunicate and interact with our mongodb database
const mongoose = require("mongoose");
// express-session package for authentications and flash messages
const session = require("express-session");
// Mongoose database connection:
require("./config/database");

// Routers:
var homeRouter = require("./routes/home");
const campgroundsRouter = require("./routes/campgrounds");
const reviewsRouter = require("./routes/reviews");

// creating the app:
var app = express();

// ???
app.engine("ejs", ejsMate);
// view engine setup so node knows where to look for the views files and what type of files they are
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// applying the dependencies funcionallity to the app.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Athentication & flash express-session middleware

app.use(
  session({
    secret: "cats", // used to parse the cookie sent
    resave: false, // so server does not complain
    saveUninitialized: true, // so server does not complain
    cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

// Main routes:
app.use("/", homeRouter);
app.use("/campgrounds", campgroundsRouter);
app.use("/campgrounds/:id/reviews", reviewsRouter);

// catches non-existing urls
app.all("*", (req, res, next) => {
  next(createError(404, "Page not found"));
});

// ERROR HANDLING:

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
