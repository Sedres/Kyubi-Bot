const {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-game")
        .setDescription('Opens up the "Add a game" modal.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("game")
                .setPlaceholder("Select a game")
                .addOptions([
                    {
                        label: "Game 1",
                        value: "game1",
                    },
                    {
                        label: "Game 2",
                        value: "game2",
                    },
                    {
                        label: "Game 3",
                        value: "game3",
                    },
                ])
        );

        await interaction.reply({
            content: "Please select a game from the menu below:",
            components: [row],
        });
    },
};
