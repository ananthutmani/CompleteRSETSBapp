var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Event = require("../../models/PESmodels/events"),
    PESUser = require("../../models/users"),
    middleware = require("../../middleware");


router.get("/", function (req, res) {
    Event.find({}, function (err, allEvents) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("PES/landing", { event: allEvents });
        }
    });
});
router.post("/", middleware.checkPESadmin, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var date = req.body.date;
    var time = req.body.time;
    var upcoming = req.body.upcoming;
    var reglink = req.body.reglink;
    var desc = req.body.description;
    var newEvent = { name: name, image: image, time: time, description: desc, date: date, upcoming: upcoming, reglink: reglink };
    Event.create(newEvent, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/pes");
            console.log(name + " added!")
        }
    })
});
// New Route
router.get("/new", middleware.checkPESadmin, function (req, res) {
    res.render("PES/new");
});

// ================================
// Auth Routes
// ================================

// show Signup
// router.get("/pessigninroute", function (req, res) {
//     res.render("PES/register", { page: 'register' });
// });
// loginroute
router.get("/peslogin", function (req, res) {
    res.render("PES/login", { page: 'login' });
});
// Handle Signup Logic
// router.post("/pessigninroute", function (req, res) {
//     var newPESUser = new PESUser({ username: req.body.username });
//     var truthVar = process.env.PESADMIN;
//     // var truthVar = "rset";
//     if (req.body.adminCode == truthVar) {
//         newPESUser.isPESAdmin = true;
//     }
//     PESUser.register(newPESUser, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("PES/register");
//         }
//         passport.authenticate("local")(req, res, function () {
//             res.redirect("/pes");
//         });
//     });
// });

router.post("/peslogin", passport.authenticate("local", {
    successRedirect: "/pes",
    failureRedirect: "/pes/peslogin"
}), function (req, res) { });

// Logout Route
router.get("/peslogout", function (req, res) {
    req.logout();
    res.redirect("/pes");
});

// EDIT EVENT ROUTE
router.get("/:id/edit", middleware.checkPESadmin, function (req, res) {
    Event.findById(req.params.id, function (err, foundEvent) {
        res.render("PES/edit", { event: foundEvent });
    });
});

// UPDATE EVENT ROUTE
router.put("/:id", middleware.checkPESadmin, function (req, res) {
    // find and update correct event
    Event.findByIdAndUpdate(req.params.id, req.body.event, function (err, updatedEvent) {
        if (err) {
            res.redirect("/pes");
        }
        else {
            res.redirect("/pes");
        }
    });
});

// Destroy Event route
router.delete("/:id", middleware.checkPESadmin, function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/pes");
        }
        else {
            res.redirect("/pes");
        }
    })
});

module.exports = router;
