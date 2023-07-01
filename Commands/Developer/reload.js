const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { loadCommands } = require(`../../Handlers/commandHandler`);
const { loadEvents } = require(`../../Handlers/eventHandler`);
const { loadButtons } = require("../../Handlers/buttonHandler");
const { loadMenus } = require("../../Handlers/menuHandler");
module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Este comando actualiza los comandos y eventos")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("tipo")
                .setDescription("Selecciona el tipo de elemento a recargar")
                .setRequired(true)
                .addChoices(
                    {
                        name: "Eventos",
                        value: "events",
                        description: "Recarga los eventos",
                    },
                    {
                        name: "Comandos",
                        value: "commands",
                        description: "Recarga todos los comandos",
                    },
                    {
                        name: "Botones",
                        value: "buttons",
                        description: "Recarga todos los botones",
                    },
                    {
                        name: "Menús",
                        value: "menus",
                        description: "Recarga todos los menús",
                    }
                )
        ),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        const subCommand = interaction.options.getString("tipo");
        switch (subCommand) {
            case "events":
                {
                    for (const [key, value] of client.events)
                        client.removeAllListeners(`${key}`, value, true);
                    loadEvents(client);
                    await interaction.reply({
                        content: "Tus eventos se han recargado",
                        ephemeral: true,
                    });
                }
                break;
            case "commands":
                {
                    loadCommands(client);
                    interaction.reply({
                        content: "Tus comandos se han recargado correctamente",
                        ephemeral: true,
                    });
                }
                break;
            case "buttons":
                {
                    loadButtons(client);
                    interaction.reply({
                        content: "Tus botones se han recargado correctamente",
                        ephemeral: true,
                    });
                }
                break;
            case "menus":
                {
                    loadMenus(client);
                    interaction.reply({
                        content: "Tus menús se han recargado correctamente",
                        ephemeral: true,
                    });
                }
                break;
        }
    },
};
