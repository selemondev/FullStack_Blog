const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String,
        required: [ true, "Please add a blog image"]
    },

    title: {
        type: String,
        required: [ true, "Please add a title"]
    },

    description: {
        type: String,
        required: [ true, "Please add a description"]
    },

    username: {
        type: String,
        required: [ true, "Please add a username"]
    }

});

module.exports = mongoose.model("Blog", blogSchema)