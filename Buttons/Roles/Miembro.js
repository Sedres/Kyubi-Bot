module.exports = {
    data: {
        name: "member",
    },
    async execute(interaction, client) {
        const memberRole =
            interaction.guild.roles.cache.get(`1109464444687355938`);
        const pings = interaction.guild.roles.cache.get(`1109464444687355937`);
        const hasRole = interaction.member.roles.cache.has(memberRole.id);
        if (hasRole) {
            return interaction.member.roles.remove(memberRole).then((member) =>
                interaction.reply({
                    content: `El rol ${memberRole} se ha quitado correctamente`,
                    ephemeral: true,
                })
            );
        }

        return interaction.member.roles.add(memberRole).then(
            (member) =>
                interaction.reply({
                    content: `El rol ${memberRole} se ha agregado correctamente`,
                    ephemeral: true,
                })
            // await interaction.member.roles.remove(pings)
        );
    },
};
