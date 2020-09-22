var express = require("express");
var router = express.Router();
var passport = require("passport");
var Blog = require("../../models/Blogmodels/blogs");
var User = require("../../models/users");

// Root Route
router.get("/", function (req, res) {
    Blog.find({}, function (err, allBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("Blog/landing", { blogs: allBlogs, page: 'blogs' });
        }
    });
});

// show register form
router.get("/register", function (req, res) {
    res.render("Blog/register", { page: 'register' });
});
//show login form
router.get("/login", function (req, res) {
    res.render("Blog/login", { page: 'login' });
});
// Handle Signup Logic
router.post("/register", function (req, res) {
    var newBlogUser = new User({ username: req.body.username });
    // if (req.body.adminCode == process.env.BLOGCODE) {
    if (req.body.adminCode == "blogadmin") {
        newBlogUser.isBlogAdmin = true;
    }
    User.register(newBlogUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("Blog/register", { error: err.message });
        }
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Welcome to The Power Factor " + user.username);
            res.redirect("/pes/pf/blogs");
        })
    });
})
// Handling post logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/pes/pf/blogs",
    failureRedirect: "/pes/pf/login"
}), function (req, res) { });

// Logout Route
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You've been logged out.");
    res.redirect("/pes/pf/blogs");
});

module.exports = router;
