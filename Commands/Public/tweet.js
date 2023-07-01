const {
    SlashCommandBuilder,
    EmbedBuilder,
    UserResolvable,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tweet")
        .setDescription("🎮 | Crea un tweet falso")
        .addUserOption((option) =>
            option
                .setName("usuario")
                .setDescription("Elige un usuario")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("tweet")
                .setDescription("Escribe un tweet")
                .setRequired(true)
        ),
    async execute(interaction) {
        let usuario = interaction.options.getUser("usuario");
        let tweet = interaction.options.getString("tweet");
        let avatarUrl = usuario.avatarURL({ extension: "jpg" });
        let canvas = `https://some-random-api.com/canvas/misc/tweet?avatar=${avatarUrl}&displayname=${
            usuario.username
        }&username=${usuario.username}&comment=${encodeURIComponent(tweet)}`;

        const embed = new EmbedBuilder()
            .setTitle("**Nuevo tweet**")
            .setImage(canvas)
            .setTimestamp()
            .setColor("#2b2d31");

        interaction.reply({
            content: `<:verifyicon:1082767419073896580> **Tweet enviado correctamente**`,
            ephemeral: true,
        });
        await interaction.channel.send({
            embeds: [embed],
        });
    },
};
