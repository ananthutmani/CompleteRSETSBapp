var Comment = require("../models/Blogmodels/comment");
var middlewareObj = {};
middlewareObj.checkPESadmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isPESAdmin) {
            return next();
        }
    }
    res.redirect("/pes");
}
middlewareObj.checkSBadmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isSBAdmin) {
            return next();
        }
    }
    res.redirect("/pes");
}
middlewareObj.checkBlogadmin = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.isBlogAdmin) {
            return next();
        }
    }
    res.redirect("/pes/pf/blogs");
}
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err) {
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user._id)||(req.user.isBlogAdmin)) {
                    next();
                }
                else {
                    req.flash("error", "Permission Denied.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Log In first.");
        res.redirect("back");
    }
}

// middlewareObj.checkAdmin = function(req, res, next){
//     if(req.isAuthenticated()){
//         if(req.user.isAdmin){
//             next();
//         }
//         else {
//             req.flash("error", "Permission Denied.");
//             res.redirect("back");
//         }
//     }
// }

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Log In first.");
    res.redirect("/pes/pf/login");
}

module.exports = middlewareObj;