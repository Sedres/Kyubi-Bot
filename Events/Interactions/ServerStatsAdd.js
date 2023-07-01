const GuildConfig = require("../../Schemas/statsSchema");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(member, client) {
        try {
            const guildId = member.guild.id;
            const guildConfig = await GuildConfig.findOne({ guildId });

            if (guildConfig) {
                // Fetching the guild ensures we have the latest member count
                const guild = await client.guilds.fetch(guildId);

                const promises = guildConfig.channels.map(
                    async (channelConfig, index) => {
                        const channelId = channelConfig.channelId;
                        const canal = client.channels.cache.get(channelId);

                        if (canal) {
                            const memberCount = guild.members.cache.filter(
                                (member) => !member.user.bot
                            ).size;
                            const botCount = guild.members.cache.filter(
                                (member) => member.user.bot
                            ).size;
                            const allCount = guild.memberCount;

                            const channelName =
                                channelConfig.type === "usersStats"
                                    ? `${channelConfig.nombre} - ${memberCount}`
                                    : channelConfig.type === "botStats"
                                    ? `${channelConfig.nombre} - ${botCount}`
                                    : channelConfig.type === "allStats"
                                    ? `${channelConfig.nombre} - ${allCount}`
                                    : null;

                            // Añadir tiempo de espera de 1 segundo entre cada llamada
                            await new Promise((resolve) =>
                                setTimeout(resolve, index * 5000)
                            );
                            return canal.setName(channelName);
                        }
                    }
                );

                await Promise.all(promises.filter(Boolean));
            }
        } catch (error) {
            console.error(error);
        }
    },
};
