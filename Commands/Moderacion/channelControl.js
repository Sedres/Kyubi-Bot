const {
    SlashCommandBuilder,
    PermissionsBitField,
    EmbedBuilder,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("channelcontrol")
        .setDescription("Controla el estado de bloqueo de un canal")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option) =>
            option
                .setName("estado")
                .setDescription("Selecciona 'lock' o 'unlock'")
                .setRequired(true)
                .addChoices(
                    { name: "Lock", value: "lock" },
                    { name: "Unlock", value: "unlock" }
                )
        )
        .addChannelOption((option) =>
            option
                .setName("channel")
                .setDescription("El canal a bloquear o desbloquear")
                .setRequired(false)
        ),

    async execute(interaction) {
        const estado = interaction.options.getString("estado");
        const canal = interaction.channel;
        const guild = interaction.guild;

        if (estado === "lock") {
            let channel = interaction.options.getChannel("channel");

            if (!channel) {
                return interaction.reply("¡Debes seleccionar un canal!");
            }

            let permissions = {
                id: guild.id,
                deny: [PermissionsBitField.Flags.SendMessages],
            };

            await channel.permissionOverwrites.set([permissions]);

            const embed = new EmbedBuilder()
                .setColor("#00fff7")
                .setDescription(
                    `:white_check_mark: ${channel} ha sido **bloqueado**`
                );

            await interaction.reply({ embeds: [embed] });
        }

        if (estado === "unlock") {
            let channel = interaction.options.getChannel("channel");

            if (!channel) {
                return interaction.reply("¡Debes seleccionar un canal!");
            }

            let permissions = {
                id: guild.id,
                allow: [PermissionsBitField.Flags.SendMessages],
            };

            await channel.permissionOverwrites.set([permissions]);

            const embed = new EmbedBuilder()
                .setColor("#00fff7")
                .setDescription(
                    `:white_check_mark: ${channel} ha sido **desbloqueado**`
                );

            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
