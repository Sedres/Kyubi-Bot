const { AuditLogEvent, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "guildBanRemove",
    once: false,
    async execute(member) {
        const { executor } = audit.entries.first();

        const name = member.user.username;
        const id = member.user.id;

        const channelID = `1121544980096372878`;
        const Channel = await member.guild.channels.cache.get(channelID);

        const embed = new EmbedBuilder()
            .setTitle(`Usuario Desbaneado`)
            .addFields({
                name: `Nombre del usuario`,
                value: `${name}`,
            })
            .addFields({ name: `ID del usuario`, value: `${id}` })
            .addFields({
                name: `Desbaneado por`,
                value: `${executor.tag}`,
            })
            .setTimestamp();

        Channel.send({ embeds: [embed] });
    },
};
