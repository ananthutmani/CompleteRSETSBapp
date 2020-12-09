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
            var SB=[
            {link:"https://i.imgur.com/IWKLWBq.jpg", alt:"Best Student Branch: IEEE LINK AURA"}, 
            {link:"https://i.imgur.com/Kp45eys.jpg", alt:"Large Category Winner: Snag the Insignia"}, 
            {link:"https://i.imgur.com/gCGzsLT.jpg", alt:"Overall Champion: IEEE PES Kerala CHapter Orion"}, 
            {link:"https://i.imgur.com/mSU4ve4.jpg", alt:"Champion: Kochi Hub IEEE KHM WAR"}, 
            {link:"https://i.imgur.com/lKVjtdr.jpg", alt:"Champion: Exuro 2020 TKMCE IEEE KERALA SECTION"}
        ];
            var student=[
                {link:"https://i.imgur.com/hmEJ5Yt.jpg", alt:"Jerin Peter: IAS CMD 2020 Robotics contest winner"},
                {link:"https://i.imgur.com/aVTpXch.jpg", alt:"Vinay Mathew Varghese: IEEE CS Best Volunteer Award"}, 
                {link:"https://i.imgur.com/nScGRQi.jpg", alt:"Anu Maria Joykutty: Joint Secretary of IEEE CS Kochi Hub"}, 
                {link:"https://i.imgur.com/3pZyDOb.jpg", alt:"Eldho Babu: Technical Coordinator, IA/IE/PELS Jt. Chapter Kochi Hub"},
                {link:"https://i.imgur.com/Im2a95E.jpg", alt:"Nivetha KM: Student Representative of IA/IE/PELS Jt. Chapter, Kochi Hub"}, {link:"https://i.imgur.com/duNhTLs.jpg", alt:"Rohit Joseph Mathew: CSIS Design team member 2020"}, 
                {link:"https://i.imgur.com/SJQgeJU.jpg", alt:"Ann Rose Cherian: Kochi Hub Coordinator of IEEE CS Student Volunteer Team 2020"}, {link:"https://i.imgur.com/R6zjHUA.jpg", alt:"Sonal Saju: Women in Power Representative of PES"}, 
                {link:"https://i.imgur.com/EMTcWCW.jpg", alt:"Thomaskutty K Jimmy: Student Ambassador, CSIS '20"}, 
                {link:"https://i.imgur.com/ZjvULvX.jpg", alt:"Eldho Babu: Ambassador, IEEE PES YP Kerala"}, 
                {link:"https://i.imgur.com/re6ecZR.jpg", alt:"Rohit Joseph Mathew: IEEE Xtreme 14.0 Student Ambassador"}, 
                {link:"https://i.imgur.com/JQn9Cl9.jpg", alt:"Arjun Sunil Kumar: Student Ambassador, IEEE XTREME 14.0"}, 
                {link:"https://i.imgur.com/ZwXCsLC.jpg", alt:"Thomaskutty K Jimmy: Student Ambassador, Hack 4 Humanity"}, 
                {link:"https://i.imgur.com/j5U6wvL.jpg", alt:"Eldho Babu: PES Day 2020 Student Ambassador"}, 
                {link:"https://i.imgur.com/51W897L.jpg", alt:"Rohit Joseph Mathew: PES Day 2020 Student Ambassador"}
            ]; 
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
router.get("/events", function (req, res) {
    Event.find({}, function (err, allEvents) {
        if (err) {
            console.log(err);
        }
        else {            
            res.render("SB/detail", { event: allEvents });
        }
    });
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
// router.get("/sbsigninroute", function (req, res) {
//     res.render("SB/register", { page: 'register' });
// });
// loginroute
router.get("/sblogin", function (req, res) {
    res.render("SB/login", { page: 'login' });
});
// Handle Signup Logic
// router.post("/sbsigninroute", function (req, res) {
//     var newSBUser = new SBUser({ username: req.body.username });
//     var truthVar = process.env.RSETADMIN;
//     // var truthVar = "rsetsb";
//     if (req.body.adminCode == truthVar) {
//         newSBUser.isSBAdmin = true;
//     }
//     SBUser.register(newSBUser, req.body.password, function (err, user) {
//         if (err) {
//             console.log(err);
//             return res.render("SB/register");
//         }
//         passport.authenticate("local")(req, res, function () {
//             res.redirect("/");
//         });
//     });
// });

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
