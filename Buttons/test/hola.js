module.exports = {
    data: {
        name: "hola",
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `Hola a todos como estais? Ahora ya lo he modificado`,
        });
    },
};
