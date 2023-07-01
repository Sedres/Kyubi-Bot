module.exports = {
    data: {
        name: "pings",
    },
    async execute(interaction, client) {
        const pings = interaction.guild.roles.cache.get(`1109464444687355937`);
        const memberRole =
            interaction.guild.roles.cache.get(`1109464444687355938`);
        const hasRole = interaction.member.roles.cache.has(pings.id);
        if (hasRole) {
            return interaction.member.roles.remove(pings).then((member) =>
                interaction.reply({
                    content: `El rol ${pings} se ha quitado correctamente`,
                    ephemeral: true,
                })
            );
        }

        return interaction.member.roles.add(pings).then(
            (member) =>
                interaction.reply({
                    content: `El rol ${pings} se ha agregado correctamente`,
                    ephemeral: true,
                }),

            // await interaction.member.roles.remove(memberRole)
        );
    },
};
