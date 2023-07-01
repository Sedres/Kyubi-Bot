// Require necessary modules from discord.js, fs and path
const { SlashCommandBuilder } = require("@discordjs/builders");
const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

// Define the slash command
module.exports = {
    data: new SlashCommandBuilder()
        .setName("changelog")
        .setDescription("Shows the most recently modified commands."),
    async execute(interaction) {
        // IDs of users who are allowed to use this command
        const authorizedUserIds = ["929800340566593568", "USER_ID_2"]; // Replace with actual Discord user IDs

        // If the user who sent the message is not authorized, end the command here
        if (!authorizedUserIds.includes(interaction.user.id)) {
            await interaction.reply({
                content:
                    "🔒 Sorry, you don't have permission to use this command.",
                ephemeral: true,
            });
            return;
        }

        const commandsDir = "./Commands"; // Change this to your commands directory
        const commandFiles = fs
            .readdirSync(commandsDir)
            .filter((file) => file.endsWith(".js"));
        const subDirs = fs
            .readdirSync(commandsDir)
            .filter((item) =>
                fs.lstatSync(path.join(commandsDir, item)).isDirectory()
            );

        // Loop over each subdirectory
        subDirs.forEach((subDir) => {
            const subDirFiles = fs
                .readdirSync(path.join(commandsDir, subDir))
                .filter((file) => file.endsWith(".js"));
            commandFiles.push(
                ...subDirFiles.map((file) => `${subDir}/${file}`)
            );
        });

        // Create an array of command stats
        const commandStats = commandFiles.map((file) => {
            const fullPath = path.join(commandsDir, file);
            const stats = fs.lstatSync(fullPath);
            return {
                name: file,
                mtime: stats.mtime,
            };
        });

        // Sort the array by modification time
        commandStats.sort((a, b) => b.mtime - a.mtime);

        // Create embed for most recently edited command
        const embedRecent = new EmbedBuilder()
            .setTitle("🔥 Most Recently Modified Command")
            .setColor("#fc0303")
            .setDescription(
                `**${commandStats[0].name}** - 🕒 ${commandStats[0].mtime}`
            );

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("show_all")
                .setLabel("Show All")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("hide_all")
                .setLabel("Hide All")
                .setStyle(ButtonStyle.Danger)
        );

        // Respond to the interaction with initial embed and buttons
        await interaction.reply({ embeds: [embedRecent], components: [row] });

        // Create a collector for button clicks
        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000,
        });

        // Define the actions for when a button is clicked
        collector.on("collect", async (i) => {
            await i.deferUpdate();

            // Define actions based on which button is clicked
            if (i.customId === "show_all") {
                // If "Show All" is clicked, display all commands
                const embedAll = new EmbedBuilder()
                    .setTitle("📜 All Commands - Sorted by last modification")
                    .setColor("#03befc")
                    .setDescription(
                        commandStats
                            .map(
                                (command, index) =>
                                    `**${index + 1}. ${command.name}** - 🕒 ${
                                        command.mtime
                                    }`
                            )
                            .join("\n")
                    );

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("hide_all")
                        .setLabel("Hide All")
                        .setStyle(ButtonStyle.Danger)
                );

                await i.editReply({ embeds: [embedAll], components: [row] });
            } else if (i.customId === "hide_all") {
                // If "Hide All" is clicked, display only the most recent command
                const embedRecent = new EmbedBuilder()
                    .setTitle("🔥 Most Recently Modified Command")
                    .setColor("#fc0303")
                    .setDescription(
                        `**${commandStats[0].name}** - 🕒 ${commandStats[0].mtime}`
                    );

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("show_all")
                        .setLabel("Show All")
                        .setStyle(ButtonStyle.Primary)
                );

                await i.editReply({ embeds: [embedRecent], components: [row] });
            }
        });

        // When the collector stops, disable the buttons
        collector.on("end", async () => {
            const disabledRow = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId("show_all")
                    .setLabel("Show All")
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId("hide_all")
                    .setLabel("Hide All")
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true)
            );

            await interaction.editReply({ components: [disabledRow] });
        });
    },
};
