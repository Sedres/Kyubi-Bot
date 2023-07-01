const {
    ChatInputCommandInteraction,
    SelectMenuInteraction,
} = require("discord.js");
require("dotenv").config();

module.exports = {
    name: "interactionCreate",
    /**
     *
     * @param {ChatInputCommandInteraction | SelectMenuInteraction} interaction
     */
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command)
                return interaction.reply({
                    content: "This command is outdated.",
                    ephemeral: true,
                });

            if (
                command.developer &&
                interaction.user.id !== "929800340566593568"
            )
                return interaction.reply({
                    content: "This command is only available to the developer.",
                    ephemeral: true,
                });

            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            // Handle button interactions
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);

            if (!button) return new Error(`This button does not have code`);

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else if (interaction.isStringSelectMenu()) {
            // Handle select menu interactions
            const { menus } = client;
            const { customId } = interaction;
            const menu = menus.get(customId);

            if (!menu) return new Error(`This menu does not have code`);

            try {
                await menu.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else {
            return;
        }
    },
};
