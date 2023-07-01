const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Limpia una cantidad de mensajes")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addBooleanOption((option) =>
            option
                .setName("all")
                .setDescription("Eliminar todos los mensajes del canal")
        )
        .addIntegerOption((option) =>
            option
                .setName(`cantidad`)
                .setDescription("Cantidad de mensajes a eliminar")
                .setMinValue(1)
                .setMaxValue(100)
        )

        .addUserOption((option) =>
            option
                .setName(`usuario`)
                .setDescription(
                    "Selecciona un usuario que desees borrar los mensajes"
                )
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const cantidad = interaction.options.getInteger(`cantidad`);
        const user = interaction.options.getUser(`usuario`);
        const mensajes = await interaction.channel.messages.fetch();
        const isAll = interaction.options.getBoolean("all") || false;

        if (isAll) {
            interaction.channel.bulkDelete(true).then((mensaje) => {
                interaction.reply({
                    content: `Se han eliminado todos los mensajes del canal`,
                    ephemeral: true,
                });
            });
            return; // Termina la ejecución de la función
        }

        if (user) {
            if (mensajes.size === 0)
                return interaction.reply("No hay mensajes que eliminar");
            let i = 0;
            let mensajesDel = [];
            mensajes.filter((message) => {
                if (message.author.id === user.id && cantidad > i) {
                    mensajesDel.push(message);
                    i++;
                }
            });
            interaction.channel
                .bulkDelete(mensajesDel, true)
                .then((mensaje) => {
                    interaction.reply({
                        content: `Se han eliminado ${mensaje.size} mensajes de ${user.tag}`,
                        ephemeral: true,
                    });
                });
        } else {
            interaction.channel.bulkDelete(cantidad, true).then((mensaje) => {
                interaction.reply({
                    content: `Se han eliminado ${mensaje.size} mensajes`,
                    ephemeral: true,
                });
            });
        }
    },
};
