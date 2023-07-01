const { EmbedBuilder } = require("discord.js");
const Marriage = require("../../Schemas/marrySchema");

module.exports = {
    data: {
        name: "reject",
    },
    async execute(interaction, client) {
        const marriage = await Marriage.findOne({
            userId: interaction.user.id,
        }).exec();

        if (!marriage) {
            interaction.reply({
                content: "No tienes ninguna propuesta de matrimonio pendiente.",
                ephemeral: true,
            });
            return;
        }

        const user = await client.users.fetch(marriage.userId);
        const member = await interaction.guild.members.fetch(marriage.targetId);

        interaction.update({
            embeds: [
                new EmbedBuilder()
                    .setColor("#37AADF")
                    .setDescription(
                        `${user} ha rechazado la propuesta de matrimonio de ${member} 😢`
                    ),
            ],
            components: [], // Eliminar los botones de la respuesta original
        });
    },
};
