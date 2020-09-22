var mongoose = require("mongoose");
var blogSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    authorName: String,
    authorImage: String,
    authorCollege: String,
    authorBio: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    isExclusive: { type: Boolean, default: false }
});

var Blog = mongoose.model("Blog", blogSchema);

module.exports = mongoose.model("Blog", blogSchema);