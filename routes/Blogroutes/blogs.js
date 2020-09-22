var express = require("express");
var router = express.Router();
var Blog = require("../../models/Blogmodels/blogs");
var middleware = require("../../middleware");

//INDEX - show all blogs
router.get("/", function (req, res) {
    // Get all blogs from DB
    Blog.find({}, function (err, allBlogs) {
        if (err) {
            console.log(err);
        } else {
            res.render("Blog/blogs/index", { blogs: allBlogs, page: 'blogs' });
        }
    });
});

// create route
router.post("/", middleware.checkBlogadmin, function (req, res){
    // get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var isExclusive = req.body.isExclusive;
    var authorName = req.body.authorName;
    var authorImage = req.body.authorImage;
    var authorCollege = req.body.authorCollege;
    var authorBio = req.body.authorBio;
    var newBlog = { name: name, image: image, description: desc, isExclusive: isExclusive, authorName: authorName, authorImage: authorImage, authorCollege: authorCollege, authorBio: authorBio  };
    // create a new blog and save to database
    Blog.create(newBlog, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            // redirect to blogs page
            res.redirect("/pes/pf/blogs");
            console.log(name + " added!")
        }
    })
});

// new route
router.get("/new", middleware.checkBlogadmin, function (req, res) {
    res.render("Blog/blogs/new");
});

// SHOW route - show more info
router.get("/:id", function (req, res) {
    // find blog of that id
    Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
        if(err || !foundBlog){
            console.log(err);
            req.flash('error', 'Sorry, that blog does not exist!');
            return res.redirect('/blogs');
        }
        else {
            console.log(foundBlog);
            res.render("Blog/blogs/show", { blog: foundBlog });
        }
    });
});

// EDIT BLOG ROUTE
router.get("/:id/edit", middleware.checkBlogadmin, function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        res.render("Blog/blogs/edit", { blog: foundBlog });
    });
});

// UPDATE BLOG ROUTE
router.put("/:id", middleware.checkBlogadmin, function (req, res) {
    // find and update correct blog
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
        if (err) {
            res.redirect("/pes/pf/blogs");
        }
        else {
            res.redirect("/pes/pf/blogs/" + req.params.id);
        }
    });
    // Redirect to show page
});

// Destroy Blog route
router.delete("/:id", middleware.checkBlogadmin, function (req, res) {
    Blog.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/pes/pf/blogs");
        }
        else {
            res.redirect("/pes/pf/blogs");
        }
    })
})

module.exports = router;
