const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("autorol")
        .setDescription("Asignacion de roles")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`member`)
                .setLabel("Miembro")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId(`pings`)
                .setLabel("Pings")
                .setStyle(ButtonStyle.Danger)
        );

        const embed = new EmbedBuilder().setTitle(
            `Selecciona el rol que necesites`
        );
        await interaction.reply({ embeds: [embed], components: [button] });
    },
};
