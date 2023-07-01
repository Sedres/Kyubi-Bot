const GuildConfig = require("../../Schemas/statsSchema");

module.exports = {
    name: "presenceUpdate",
    once: false,
    async execute(member, newPresence, client) {
        try {
            const guildId = member.guild.id;
            const guildConfig = await GuildConfig.findOne({ guildId });

            // Si no se encuentra la configuración de la guild, no hay nada que hacer
            if (!guildConfig) return;

            const presenceStatsChannel = guildConfig.channels.find(
                (channel) => channel.type === "presenceStats"
            );

            // Si no hay un canal de estadísticas de presencia, no hay nada que hacer
            if (!presenceStatsChannel) return;

            const channelId = presenceStatsChannel.channelId;
            const canal = newPresence.guild.channels.cache.get(channelId);

            // Si no hay canal encontrado, no hay nada que hacer
            if (!canal) return;

            // Contando los estados de presencia con una única iteración
            const presenceStatus = {
                online: 0,
                dnd: 0,
                idle: 0,
                offline: 0,
            };

            member.guild.members.cache.forEach((m) => {
                const status = m.presence?.status || "offline";
                if (status in presenceStatus) presenceStatus[status]++;
            });

            const presenceMessage = `🟢 ${presenceStatus.online} ⛔ ${presenceStatus.dnd} 🌙 ${presenceStatus.idle} ⚫ ${presenceStatus.offline}`;
            console.log(presenceMessage);

            // Intentar cambiar el nombre del canal después de un tiempo de espera
            setTimeout(async () => {
                try {
                    await canal.setName(presenceMessage);
                } catch (error) {
                    console.error(
                        "No se pudo cambiar el nombre del canal: ",
                        error
                    );
                }
            }, 10000); // 10 segundos de tiempo de espera
        } catch (error) {
            console.error("Error al actualizar la presencia: ", error);
        }
    },
};
