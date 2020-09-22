var mongoose = require("mongoose");
var eventSchema = new mongoose.Schema({
    upcoming: { type: Boolean, default: false },
    name: String,
    image: String,
    date: String,
    time: String,
    description: String,
    reglink: String
});

module.exports = mongoose.model("Event", eventSchema);
