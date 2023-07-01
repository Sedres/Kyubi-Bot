const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ChannelType,
} = require("discord.js");

const Ticket = require("../../Schemas/ticketSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-setup")
        .setDescription("Configura el sistema de tickets")
        .addStringOption((option) =>
            option
                .setName("titulo")
                .setDescription("Título del embed")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("descripcion")
                .setDescription("Descripción del embed")
                .setRequired(true)
        )
        .addChannelOption((option) =>
            option
                .setName("categoria_tickets")
                .setDescription("Categoría donde se enviarán los tickets")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
        .addRoleOption((option) =>
            option
                .setName("rol_staff")
                .setDescription("Rol de staff para los tickets")
                .setRequired(true)
        )
        .addChannelOption((option) =>
            option
                .setName("canal")
                .setDescription("Canal donde se enviará el embed y el botón")
                .addChannelTypes(ChannelType.GuildText)
        )
        .addChannelOption((option) =>
            option
                .setName("canal_transcript")
                .setDescription(
                    "Canal donde se enviará la transcripción del ticket"
                )
                .addChannelTypes(ChannelType.GuildText)
        )
        .addStringOption((option) =>
            option.setName("color").setDescription("Color del embed")
        ),
    async execute(interaction) {
        const color = interaction.options.getString("color") || "#66CDAA";
        const titulo = interaction.options.getString("titulo");
        const descripcion = interaction.options.getString("descripcion");
        const canal =
            interaction.options.getChannel("canal") || interaction.channel;
        const textoBoton =
            interaction.options.getString("texto_boton") || "Open Ticket";
        const emojiBoton = interaction.options.getString("emoji_boton") || "🎫";
        const categoriaTickets =
            interaction.options.getChannel("categoria_tickets");
        const canalTranscript =
            interaction.options.getChannel("canal_transcript");
        const rolStaff = interaction.options.getRole("rol_staff");

        const existingTicket = await Ticket.findOne({
            guildId: interaction.guild.id,
        });

        const ticketData = {
            channelId: canal.id,
            guildId: interaction.guild.id,
            categoryId: categoriaTickets.id,
            transcriptChannelId: canalTranscript ? canalTranscript.id : null,
            staffRoleId: rolStaff.id,
        };

        if (existingTicket) {
            existingTicket.channelId = canal.id;
            existingTicket.categoryId = categoriaTickets.id;
            existingTicket.transcriptChannelId = canalTranscript
                ? canalTranscript.id
                : null;
            existingTicket.staffRoleId = rolStaff.id;
            await existingTicket.save();
        } else {
            const newTicket = new Ticket(ticketData);
            await newTicket.save();
        }

        const embed = new EmbedBuilder()
            .setTitle(titulo)
            .setDescription(descripcion)
            .setColor(color)
            .setTimestamp();

        const button = new ButtonBuilder()
            .setCustomId("open_ticket")
            .setLabel(textoBoton)
            .setStyle(ButtonStyle.Primary)
            .setEmoji(emojiBoton);

        const row = new ActionRowBuilder().addComponents(button);

        const message = await canal.send({
            embeds: [embed],
            components: [row],
        });

        await interaction.reply({
            content: "El sistema de tickets ha sido configurado correctamente.",
            ephemeral: true,
        });
    },
};
