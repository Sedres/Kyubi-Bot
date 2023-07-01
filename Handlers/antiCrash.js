const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
    const ChannelID = "1121544978880016564";
    const Embed = new EmbedBuilder()
        .setColor("DarkButNotBlack")
        .setTimestamp()
        .setFooter({ text: "⚠️ Sistema Anti Crash" })
        .setTitle("**> Error Encontrado**");

    const sendErrorMessage = (description) => {
        const Channel = client.channels.cache.get(ChannelID);
        if (Channel) {
            Channel.send({
                embeds: [Embed.setDescription(description)],
            });
        }
    };

    client.on("error", (err) => {
        console.log("Discord API Error:", err);
        sendErrorMessage(
            "**Discord API Error/Captura:\n\n** ```" + err + "```"
        );
    });

    process.on("unhandledRejection", (reason, p) => {
        console.log("Unhandled promise rejection:", reason, p);
        sendErrorMessage(
            "**Rechazo/captura no manejado:\n\n** ```" + reason + "```"
        );
    });

    process.on("uncaughtException", (err, origin) => {
        console.log("Uncaught Exception:", err, origin);
        sendErrorMessage(
            "**Excepción/captura no detectada:\n\n** ```" + err + "```"
        );
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log("Uncaught Exception Monitor:", err, origin);
        sendErrorMessage(
            "**Supervisión/captura de excepciones no detectadas:\n\n** ```" +
                err +
                "```"
        );
    });

    process.on("warning", (warn) => {
        console.log("Warning:", warn);
        sendErrorMessage("**Advertencia/Captura:\n\n** ```" + warn + "```");
    });
};
