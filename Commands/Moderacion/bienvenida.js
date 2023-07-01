const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const welcome = require("../../Schemas/welcome");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-welcome")
        .setDescription("Configura el sistema de bienvenida")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) =>
            option
                .setName("canal")
                .setDescription(
                    "El canal para enviar los mensajes de bienvenida."
                )
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription(
                    "El color del mensaje de bienvenida en formato hexadecimal."
                )
                .setRequired(false)
        )
        .addBooleanOption((option) =>
            option
                .setName("activar-embed")
                .setDescription("Activa o desactiva el embed de bienvenida.")
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("imagen")
                .setDescription("La URL de la imagen de bienvenida.")
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("texto-imagen")
                .setDescription(
                    "El texto personalizado para la imagen de bienvenida."
                )
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("texto-embed")
                .setDescription(
                    "El texto personalizado para el embed de bienvenida."
                )
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("titulo-embed")
                .setDescription(
                    "El título personalizado para el embed de bienvenida."
                )
                .setRequired(false)
        ),

    async execute(interaction) {
        if (!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.reply({
                content:
                    "Necesitas permisos de Administrador para ejecutar este comando.",
                ephemeral: true,
            });
        }

        const channel = interaction.options.getChannel("canal");
        const color = interaction.options.getString("color") || "#FF0000";
        const image =
            interaction.options.getString("imagen") ||
            "https://i.imgur.com/VoB85vi.png";
        const textImage =
            interaction.options.getString("texto-imagen") || "Bienvenid@";
        const textEmbed = interaction.options.getString("texto-embed") || null;
        const embedTitle =
            interaction.options.getString("titulo-embed") || null;

        const existingData = await welcome.findOneAndUpdate(
            { ServerID: interaction.guild.id },
            {
                ChannelID: channel.id,
                Color: color,
                Image: image,
                TextImage: textImage,
                TextEmbed: textEmbed,
                EmbedTitle: embedTitle,
            },
            { upsert: true }
        );

        const message = `La configuración de bienvenida ha sido ${
            existingData ? "actualizada" : "establecida"
        }.`;
        interaction.reply({ content: message, ephemeral: true });
    },
};
