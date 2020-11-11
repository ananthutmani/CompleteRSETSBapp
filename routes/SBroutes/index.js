var express = require("express"),
    router = express.Router(), 
    passport = require("passport"),
    Event = require("../../models/SBmodels/events"),
    SBUser = require("../../models/users"),
    middleware = require("../../middleware");


router.get("/", function (req, res) {
    Event.find({}, function (err, allEvents) {
        if (err) {
            console.log(err);
        }
        else {
            var SB=["https://i.imgur.com/IWKLWBq.jpg", "https://i.imgur.com/Kp45eys.jpg", "https://i.imgur.com/gCGzsLT.jpg", "https://i.imgur.com/mSU4ve4.jpg", "https://i.imgur.com/lKVjtdr.jpg"];
            var student=["https://i.imgur.com/aVTpXch.jpg", "https://i.imgur.com/hmEJ5Yt.jpg", "https://i.imgur.com/Im2a95E.jpg", "https://i.imgur.com/duNhTLs.jpg", "https://i.imgur.com/ZjvULvX.jpg", "https://i.imgur.com/51W897L.jpg", "https://i.imgur.com/SJQgeJU.jpg", "https://i.imgur.com/R6zjHUA.jpg", "https://i.imgur.com/re6ecZR.jpg", "https://i.imgur.com/j5U6wvL.jpg", "https://i.imgur.com/EMTcWCW.jpg", "https://i.imgur.com/nScGRQi.jpg", "https://i.imgur.com/JQn9Cl9.jpg", "https://i.imgur.com/ZwXCsLC.jpg", "https://i.imgur.com/3pZyDOb.jpg"];
            res.render("SB/landing", { event: allEvents, SB: SB, student: student });
        }
    });
});
router.post("/", middleware.checkSBadmin, function (req, res) {
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
            res.redirect("/");
            console.log(name + " added!")
        }
    })
});
// Execom Route
router.get("/execom", function (req, res) {
    res.render("SB/execom");
});

// New Route
router.get("/new", middleware.checkSBadmin, function (req, res) {
    res.render("SB/new");
});

// ================================
// Auth Routes
// ================================

// show Signup
router.get("/sbsigninroute", function (req, res) {
    res.render("SB/register", { page: 'register' });
});
// loginroute
router.get("/sblogin", function (req, res) {
    res.render("SB/login", { page: 'login' });
});
// Handle Signup Logic
router.post("/sbsigninroute", function (req, res) {
    var newSBUser = new SBUser({ username: req.body.username });
    var truthVar = process.env.RSETADMIN;
    // var truthVar = "rsetsb";
    if (req.body.adminCode == truthVar) {
        newSBUser.isSBAdmin = true;
    }
    SBUser.register(newSBUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("SB/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
});

router.post("/sblogin", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/sblogin"
}), function (req, res) { });

// Logout Route
router.get("/sblogout", function (req, res) {
    req.logout();
    res.redirect("/");
});

// EDIT EVENT ROUTE
router.get("/:id/edit", middleware.checkSBadmin, function (req, res) {
    Event.findById(req.params.id, function (err, foundEvent) {
        res.render("SB/edit", { event: foundEvent });
    });
});

// UPDATE EVENT ROUTE
router.put("/:id", middleware.checkSBadmin, function (req, res) {
    // find and update correct event
    Event.findByIdAndUpdate(req.params.id, req.body.event, function (err, updatedEvent) {
        if (err) {
            res.redirect("/");
        }
        else {
            res.redirect("/");
        }
    });
});

// Destroy Event route
router.delete("/:id", middleware.checkSBadmin, function (req, res) {
    Event.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/");
        }
        else {
            res.redirect("/");
        }
    })
});

module.exports = router;
