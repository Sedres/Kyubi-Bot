const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buttontest")
        .setDescription("Prueba de botones"),

    async execute(interaction) {
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`hola`)
                .setLabel("Nuevo")
                .setStyle(ButtonStyle.Success)
        );

        await interaction.reply({ components: [button] });
    },
};
