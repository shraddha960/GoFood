const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
        name: {
            type: String,
            required: [true, "Please Add the user name"]
        },
        location: {
            type: String,
            required: [true, "Please Add the location"]
        },
        email: {
            type: String,
            required: [true, "Please Add the user email address"],
            unique: [true, "Email Address already taken"]
        },
        password: {
            type: String,
            required: [true, "Please Add the user password"]
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model("user",userSchema)