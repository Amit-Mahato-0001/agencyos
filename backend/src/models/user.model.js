const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["owner", "admin", "member", "client"],
        default: "member"
    },
    tenantId: { // user kis company ka he
        type: mongoose.Schema.Types.ObjectId, // us company ka unique MongoDb id
        ref: "Tenant", // har user kisi company se linked ho compulsory
        required: true
    },
    status: {
        type: String,
        enum: ["active", "invalid"],
        default: "active"
    }
},
{ timestamps: true}
);

module.exports = mongoose.model("User", userSchema);