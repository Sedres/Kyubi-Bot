const { model, Schema } = require("mongoose");

const ticketSchema = new Schema({
    channelId: { type: String, required: true },
    guildId: { type: String, required: true },
    categoryId: { type: String, required: true },
    transcriptChannelId: {
        type: String,
        default: null,
    },
    staffRoleId: { type: String, required: true },
});

module.exports = model(`Ticket`, ticketSchema);
