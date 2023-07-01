const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
} = require("discord.js");
const GuildConfig = require("../../Schemas/statsSchema");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("stats-setup")
        .setDescription("Configura las opciones de stats")
        .addChannelOption((option) =>
            option
                .setName("canal")
                .setDescription(
                    "Canal donde se van a actualizar las stats del servidor"
                )
                .addChannelTypes(ChannelType.GuildVoice)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("type")
                .setDescription(
                    "Tipo de información que se va a mostrar en el canal"
                )
                .setRequired(true)
                .addChoices(
                    { name: "users", value: "usersStats" },
                    { name: "bots", value: "botStats" },
                    { name: "presence", value: "presenceStats" },
                    { name: "all", value: "allStats" }
                )
        )
        .addStringOption((option) =>
            option
                .setName("nombre")
                .setDescription("Nombre personalizado para el canal")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channelId = interaction.options.get("canal").value;
        const type = interaction.options.getString("type");
        const nombre = interaction.options.getString("nombre");
        const guildId = interaction.guild.id;

        try {
            // Buscar el registro existente del gremio en la base de datos
            let guildConfig = await GuildConfig.findOne({ guildId });

            if (guildConfig) {
                // El registro del gremio ya existe, buscar el canal en la configuración
                const channelConfig = guildConfig.channels.find(
                    (channel) => channel.channelId === channelId
                );

                if (channelConfig) {
                    // El canal ya está configurado, actualizar los valores
                    channelConfig.type = type;
                    channelConfig.nombre = nombre;
                } else {
                    // El canal no está configurado, agregar uno nuevo a la matriz de canales
                    guildConfig.channels.push({
                        channelId,
                        type,
                        nombre,
                    });
                }
            } else {
                // El registro del gremio no existe, crear uno nuevo con el canal configurado
                guildConfig = new GuildConfig({
                    guildId,
                    channels: [
                        {
                            channelId,
                            type,
                            nombre,
                        },
                    ],
                });
            }

            // Guardar o actualizar el registro del gremio en la base de datos
            await guildConfig.save();

            await interaction.reply({
                content: "Las opciones de stats se configuraron correctamente.",
                ephemeral: true,
            });
        } catch (error) {
            console.error("Error al guardar la configuración:", error);
            await interaction.reply({
                content:
                    "Ocurrió un error al guardar la configuración de stats.",
                ephemeral: true,
            });
        }
    },
};
