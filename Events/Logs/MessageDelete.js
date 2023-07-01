const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "messageDelete",
    once: false,
    async execute(message) {
        const autor = message.author;

        const msg = message.content;

        if (!msg) return;

        const channelID = `1121544980096372878`;
        const Channel = await message.guild.channels.cache.get(channelID);
        if (!Channel) return;
        const embed = new EmbedBuilder()
            .setTitle(`Mensaje eliminado`)
            .addFields(
                {
                    name: `Canal del mensaje`,
                    value: `${message.channel}`,
                },
                {
                    name: `Autor del mensaje`,
                    value: `${autor}`,
                },
                {
                    name: `Contenido del mensaje`,
                    value: `${msg}`,
                }
            )
            .setTimestamp();

        Channel.send({ embeds: [embed] });
    },
};
