const { AuditLogEvent, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "channelDelete",
    execute(channel) {
        channel.guild
            .fetchAuditLogs({
                type: AuditLogEvent.channelDelete,
            })
            .then(async (audit) => {
                const { executor } = audit.entries.first();

                const name = channel.name;
                const id = channel.id;
                let type = channel.type;

                if (type == 0) type = `Texto`;
                if (type == 2) type = `Voz`;
                if (type == 13) type = `Stage`;
                if (type == 15) type = `Foro`;
                if (type == 5) type = `Announcememnt`;
                if (type == 4) type = `Categoria`;

                const channelID = `1121544980096372878`;
                const Channel = await channel.guild.channels.cache.get(
                    channelID
                );

                const embed = new EmbedBuilder()
                    .setTitle(`Canal Eliminado`)
                    .addFields({
                        name: `Nombre del canal`,
                        value: `${name}`,
                    })
                    .addFields({ name: `Tipo de canal`, value: `${type}` })
                    .addFields({ name: `ID del canal`, value: `${id}` })
                    .addFields({
                        name: `Eliminado por`,
                        value: `${executor.tag}`,
                    })
                    .setTimestamp();

                Channel.send({ embeds: [embed] });
            });
    },
};
