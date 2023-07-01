const { model, Schema } = require("mongoose");

const guildSettingsSchema = new Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    boostChannelId: {
        type: String,
        required: true,
    },
    boostLogChannelId: {
        type: String,
        required: true,
    },
});

module.exports = model(`GuildSettings`, guildSettingsSchema);
