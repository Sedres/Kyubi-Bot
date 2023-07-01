const discordTranscripts = require("discord-html-transcripts");
const Ticket = require("../../Schemas/ticketSchema");

module.exports = {
    data: {
        name: "close_ticket",
    },
    async execute(interaction, client) {
        // Buscar la configuración del ticket en la base de datos por el ID del servidor (guild)
        const ticket = await Ticket.findOne({ guildId: interaction.guild.id });

        if (!ticket) {
            return interaction.reply({
                content: "No se encontró el ticket correspondiente.",
                ephemeral: true,
            });
        }

        // Obtener el ID del canal de transcripción almacenado en la base de datos
        const transcriptChannelId = ticket.transcriptChannelId;

        // Obtener el objeto de canal de texto correspondiente
        const transcriptChannel =
            interaction.guild.channels.cache.get(transcriptChannelId);

        // Obtener el canal donde se presionó el botón
        const ticketChannel = interaction.channel;

        // Generar la transcripción del canal del ticket
        const attachment = await discordTranscripts.createTranscript(
            ticketChannel
        );

        const ticketChannelInfo = `Channel ID: ${ticketChannel.id}\nChannel Name: ${ticketChannel.name}`;

        // Enviar la transcripción al canal de transcripción o al autor del ticket
        if (transcriptChannel) {
            transcriptChannel.send({
                content: `Ticket:\n${ticketChannelInfo}`,
                files: [attachment],
            });
        } else {
            const ticketAuthor = interaction.member.user;
            await ticketAuthor.send({
                content: `Tu ticket se ha cerrado.\nAquí tienes el transcript:`,
                files: [attachment],
            });
        }

        // Esperar 10 segundos antes de cerrar el ticket
        setTimeout(async () => {
            // Cerrar el ticket y eliminar el canal
            await ticketChannel.send("El ticket ha sido cerrado.");
            await ticketChannel.delete();
        }, 10000);

        // Enviar un mensaje de confirmación antes de cerrar el ticket
        await interaction.reply({
            content: "El ticket se cerrará en 10 segundos...",
            ephemeral: true,
        });
    },
};
