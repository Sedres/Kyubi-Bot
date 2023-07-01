const { SlashCommandBuilder } = require(`@discordjs/builders`);
// haga un comando de barra que obtendrá la información de emoji del usuario

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()

        .setName(`emoji-info`)
        .setDescription(`Obtiene información de emoji`)
        .addStringOption((option) =>
            option.setName(`emoji`).setDescription(`El emoji`).setRequired(true)
        ),
    async execute(interaction, client) {
        // obtener el emoji
        const emoji = interaction.options.getString(`emoji`);
        // si el emoji no es un emoji personalizado
        if (!emoji.startsWith(`<`))
            return interaction.reply({
                content: `¡Proporcione un emoji personalizado!`,
                ephemeral: true,
            });
        // obtener la identificación emoji
        const emojiid = emoji.split(`:`)[2].slice(0, -1);
        // obtener la URL del emoji
        const emojiurl = `https://cdn.discordapp.com/emojis/${emojiid}.png`;
        // enviar una respuesta
        interaction.reply({
            content: `**Emoji Info**\n\n**Nombre:** ${emoji}\n**ID:** ${emojiid}\n**URL:** [Haga clic aquí](${emojiurl})`,
            ephemeral: true,
        });
    },
};
