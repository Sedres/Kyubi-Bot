const { AuditLogEvent, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "channelCreate",
    execute(channel) {
        channel.guild
            .fetchAuditLogs({
                type: AuditLogEvent.ChannelCreate,
            })
            .then(async (audit) => {
                const { executor } = audit.entries.first();

                const name = channel.name;
                const id = channel.id;
                let type = channel.type;

                if (type === "GUILD_TEXT") type = "Texto";
                else if (type === "GUILD_VOICE") type = "Voz";
                else if (type === "GUILD_STAGE_VOICE") type = "Stage";
                else if (type === "GUILD_PUBLIC_THREAD") type = "Foro";
                else if (type === "GUILD_NEWS") type = "Announcement";
                else if (type === "GUILD_CATEGORY") type = "Categoría";

                const channelID = "1121544980096372878";
                const Channel = await channel.guild.channels.cache.get(
                    channelID
                );

                const embed = new EmbedBuilder()
                    .setTitle("Canal Creado")
                    .addFields(
                        {
                            name: "Nombre del canal",
                            value: `${name} (<#${id}>)`,
                        },
                        { name: "Tipo de canal", value: `${type}` },
                        { name: "ID del canal", value: `${id}` },
                        { name: "Creado por", value: `${executor.tag}` }
                    )
                    .setTimestamp();

                Channel.send({ embeds: [embed] });
            });
    },
};
