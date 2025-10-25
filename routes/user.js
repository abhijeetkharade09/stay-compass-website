const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// Signup Routes
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// Login Routes
router.route("/login")
      .get(userController.renderLoginForm)   // renamed for consistency
      .post(
            saveRedirectUrl,
            passport.authenticate("local", {
                failureRedirect: '/login',
                failureFlash: true
            }),
            userController.login
        );

// Logout Route
router.route("/logout")
      .get(userController.logout);

module.exports = router;
