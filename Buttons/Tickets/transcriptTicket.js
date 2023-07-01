const discordTranscripts = require("discord-html-transcripts");

module.exports = {
    data: {
        name: "transcript_ticket",
    },
    async execute(interaction) {
        // Obtener el canal donde se presionó el botón
        const ticketChannel = interaction.channel;

        // Obtener el contenido del transcript con formato HTML
        const transcript = await discordTranscripts.createTranscript(
            ticketChannel
        );

        // Obtener el autor del ticket
        const ticketAuthor = interaction.member.user;

        // Enviar el transcript como archivo adjunto en un mensaje directo al autor del ticket
        await ticketAuthor.send({
            content: "Aquí tienes el transcript del ticket:",
            files: [transcript],
        });

        // Enviar un mensaje de confirmación al usuario que presionó el botón
        await interaction.reply({
            content:
                "Se ha enviado el transcript del ticket a tu mensaje directo.",
            ephemeral: true,
        });
    },
};
