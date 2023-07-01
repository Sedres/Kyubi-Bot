const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const GuildSettings = require("../../Schemas/boostSchema"); // Modelo de MongoDB

module.exports = {
    data: new SlashCommandBuilder()
        .setName("configure")
        .setDescription("Configura los canales de boosts y logs")
        .addChannelOption((option) =>
            option
                .setName("boostchannel")
                .setDescription("Canal de boosts")
                .setRequired(true)
        )
        .addChannelOption((option) =>
            option
                .setName("logchannel")
                .setDescription("Canal de logs")
                .setRequired(true)
        ),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const boostChannel = interaction.options.getChannel("boostchannel");
        const logChannel = interaction.options.getChannel("logchannel");

        // Guardar la configuración en la base de datos
        try {
            let guildSettings = await GuildSettings.findOne({ guildId });

            if (!guildSettings) {
                guildSettings = new GuildSettings({
                    guildId: guildId,
                    boostChannelId: boostChannel.id,
                    boostLogChannelId: logChannel.id,
                });
            } else {
                guildSettings.boostChannelId = boostChannel.id;
                guildSettings.boostLogChannelId = logChannel.id;
            }

            await guildSettings.save();
        } catch (error) {
            console.log(
                "Error al guardar la configuración en la base de datos:",
                error
            );
            return interaction.reply(
                "Ocurrió un error al guardar la configuración en la base de datos."
            );
        }

        // Enviar respuesta al usuario
        interaction.reply({
            content: "Configuración de canales guardada con éxito.",
            ephemeral: true,
        });
    },
};
