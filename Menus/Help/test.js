const { EmbedBuilder } = require("discord.js");
module.exports = {
    data: {
        name: "game",
    },
    async execute(interaction, client) {
        const selectedGame = interaction.values;

        const embed = new EmbedBuilder()
            .setTitle("name")
            .setDescription(`Se ha seleccionado ${selectedGame}`)
            .setColor("Blue");

        await interaction.reply({
            embeds: [embed],
        });
    },
};
