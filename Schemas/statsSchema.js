const { model, Schema } = require("mongoose");

const statsSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    channels: [
        {
            channelId: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            nombre: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = model("GuildStats", statsSchema);
