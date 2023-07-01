const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ChannelType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");

const Ticket = require("../../Schemas/ticketSchema");

module.exports = {
    data: {
        name: "open_ticket",
    },
    async execute(interaction, client) {
        // Obtener el ID de la categoría donde se crearán los tickets desde la base de datos
        const ticket = await Ticket.findOne({ guildId: interaction.guild.id });

        if (!ticket) {
            return interaction.reply({
                content:
                    "El sistema de tickets no está configurado correctamente.",
                ephemeral: true,
            });
        }

        const { categoryId } = ticket;

        // Obtener el nombre para el canal de tickets
        const ticketChannelName = `ticket-${interaction.user.tag}`;

        // Crear el canal de tickets

        const ticketChannel = await interaction.guild.channels.create({
            name: ticketChannelName,
            type: ChannelType.GuildText,
            parent: categoryId, // Asignar la categoría al nuevo canal
        });

        ticketChannel.permissionOverwrites.create(interaction.user.id, {
            ViewChannel: true,
            SendMessages: true,
        });

        ticketChannel.permissionOverwrites.create(
            ticketChannel.guild.roles.everyone,
            {
                ViewChannel: false,
                SendMessages: false,
            }
        );

        // Crear el objeto embed con los datos personalizados
        const embed = new EmbedBuilder()
            .setTitle("Ticket de Soporte")
            .setDescription("¡Gracias por abrir un ticket de soporte!")
            .addFields({ name: "Usuario", value: interaction.user.tag })
            .setColor("#4287f5")
            .setTimestamp();

        // Crear los botones
        const closeButton = new ButtonBuilder()
            .setCustomId("close_ticket")
            .setLabel("Cerrar ticket")
            .setStyle(ButtonStyle.Danger)
            .setEmoji("🔒");

        const claimButton = new ButtonBuilder()
            .setCustomId("claim_ticket")
            .setLabel("Claim Ticket")
            .setStyle(ButtonStyle.Primary)
            .setEmoji("🎖️");

        const transcriptButton = new ButtonBuilder()
            .setCustomId("transcript_ticket")
            .setLabel("Generar Transcript")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("📝");

        const addUserButton = new ButtonBuilder()
            .setCustomId("add_user_ticket")
            .setLabel("Añadir personas")
            .setStyle(ButtonStyle.Secondary)
            .setEmoji("➕");

        // Crear la fila de botones
        const buttonRow = new ActionRowBuilder().addComponents(
            closeButton,
            claimButton,
            transcriptButton,
            addUserButton
        );

        // Enviar el embed con los botones al canal de tickets
        await ticketChannel.send({
            embeds: [embed],
            components: [buttonRow],
        });

        // Responder al usuario con un mensaje de confirmación
        await interaction.reply({
            content: `Se ha creado un nuevo canal de tickets: ${ticketChannel.toString()}`,
            ephemeral: true,
        });
    },
};
