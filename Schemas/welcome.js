const { model, Schema } = require("mongoose");

let welcome = new Schema({
    ServerID: String,
    ChannelID: String,
    Color: String,
    TextColor: String,
    ActivateEmbed: Boolean,
    Image: String,
    TextImage: String,
    TextEmbed: String,
    EmbedTitle: String,
});

module.exports = model("welcomes", welcome);
