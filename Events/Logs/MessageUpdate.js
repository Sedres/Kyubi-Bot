const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    once: false,
    async execute(message, newMessage) {
        const autor = message.author;

        const msg = message.content;

        if (!msg) return;

        const channelID = `1121544980096372878`;
        const Channel = await message.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
            .setTitle(`Mensaje editado`)
            .addFields({ name: `Mensaje inicial`, value: `${msg}` })
            .addFields({
                name: `Mensaje editado`,
                value: `${newMessage}`,
            })
            .addFields({
                name: `Autor del mensaje`,
                value: `${autor}`,
            })
            .setTimestamp();

        Channel.send({ embeds: [embed] });
    },
};
