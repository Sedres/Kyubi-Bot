const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("review-bot")
        .setDescription("Escribe una reseña para el bot")
        .setDMPermission(false)
        .addStringOption((option) =>
            option.setName("reseña").setDescription("reseña").setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("estrellas")
                .setDescription("¿Cuantas estrellas le das?")
                .addChoices(
                    { name: "⭐", value: "⭐⠀⠀⠀⠀" },
                    { name: "⭐⭐", value: "⭐⭐⠀⠀⠀" },
                    { name: "⭐⭐⭐", value: "⭐⭐⭐⠀⠀" },
                    { name: "⭐⭐⭐⭐", value: "⭐⭐⭐⭐⠀" },
                    { name: "⭐⭐⭐⭐⭐", value: "⭐⭐⭐⭐⭐" }
                )
                .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        const canal = interaction.guild.channels.cache.get(
            "1113907156509532171"
        );
        const reseña = interaction.options.getString("reseña");
        const estrellas = interaction.options.getString("estrellas");
        const embed = new EmbedBuilder()
            .setTitle("Reseña del Bot")
            .addFields(
                { name: "Reseña", value: reseña },
                { name: "Estrellas", value: estrellas },
                {
                    name: "Enviada por",
                    value: interaction.user.toString(),
                },
                { name: "Servidor", value: interaction.guild.name }
            )
            .setDescription(
                "Gracias por la reseña espero que difrutes de tu experiencia"
            )
            .setImage(
                "https://cdn.discordapp.com/attachments/989905869946892347/1023241413430870016/kmk_1.png"
            )
            .setThumbnail(
                "https://cdn.discordapp.com/emojis/1021435773565800519.gif?size=96&quality=lossless"
            )
            .setColor("#fffa00");

        canal.send({ embeds: [embed] });
        interaction.reply({
            content: "Gracias por enviar una reseña",
            ephemeral: true,
        });
    },
};
