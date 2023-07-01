const { model, Schema } = require("mongoose");

let levelSchema = new Schema({
    GuildId: {
        type: String,
        required: true,
    },
    UserId: {
        type: String,
        required: true,
    },
    xp: {
        type: Number,
        default: 0,
    },
    level: {
        type: Number,
        default: 0,
    },
    limit: {
        type: Number,
        default: 100,
    },
});

module.exports = model(`levelSchema`, levelSchema);
