var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    User = require("./models/users");

// hello
var PESRoutes = require("./routes/PESroutes/index"),
    SBRoutes = require("./routes/SBroutes/index"),
    BlogCommentRoutes = require("./routes/Blogroutes/comments"),
    BlogRoutes = require("./routes/Blogroutes/blogs"),
    BlogIndexRoutes = require("./routes/Blogroutes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/pes_app";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport Config
app.use(require("express-session")({
    secret: "RSET PES SBC",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
// temporary

app.use("/", SBRoutes);
app.get("/sitemap.xml", function (req, res) {
    res.sendFile('sitemap.xml', { root: '.' });
});
app.get("/google994d31391f28247b.html", function (req, res) {
    res.sendFile('google994d31391f28247b.html', { root: '.' });
});
app.use("/pes", PESRoutes);
app.use("/pes/pf", BlogIndexRoutes);
app.use("/pes/pf/blogs", BlogRoutes);
app.use("/pes/pf/blogs/:id/comments", BlogCommentRoutes);

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server is listening at port 3000");
})
// Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita velit molestiae iusto earum nam blanditiis totam commodi fugit quo ullam qui corporis tempore officia rerum ex beatae, soluta itaque est voluptatem numquam neque voluptatum consequatur. Natus est quos aliquam? Fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita velit molestiae iusto earum nam blanditiis totam commodi fugit quo ullam qui corporis tempore officia rerum ex beatae, soluta itaque est voluptatem numquam neque voluptatum consequatur. Natus est quos aliquam? Fuga.