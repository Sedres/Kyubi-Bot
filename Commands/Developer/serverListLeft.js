const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    developer: true, //////para que solo el creador del bot pueda utilizarlo, revisar el slashcommands en caso de que te salga que tu no eres el owner
    data: new SlashCommandBuilder()
        .setName("remove-server")
        .setDescription("Remover de algun server tu bot")
        .addStringOption((option) =>
            option
                .setName("server")
                .setDescription("Nombre o ID del server")
                .setRequired(true)
        ),

    async execute(interaction) {
        const serverOption = interaction.options.getString("server");

        const guild = interaction.client.guilds.cache.find(
            (guild) => guild.id === serverOption || guild.name === serverOption
        );

        if (guild) {
            await guild.leave();
            await interaction.reply(`Left server ${guild.name}.`);
        } else {
            await interaction.reply(`Server ${serverOption} not found.`);
        }
    },
};
