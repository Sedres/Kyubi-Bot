const Ticket = require("../../Schemas/ticketSchema");
module.exports = {
    data: {
        name: "claim_ticket",
    },
    async execute(interaction) {
        // Obtener la configuración del ticket desde la base de datos
        const ticketData = await Ticket.findOne({
            guildId: interaction.guild.id,
        });

        // Verificar si se encontró la configuración y obtener el ID del rol de staff
        const staffRoleId = ticketData?.staffRoleId;

        // Si no se encontró la configuración o el rol de staff no está definido, retornar un mensaje de error
        if (!ticketData || !staffRoleId) {
            return await interaction.reply({
                content:
                    "No se ha configurado correctamente el sistema de tickets.",
                ephemeral: true,
            });
        }

        // Verificar si el usuario tiene el rol de staff
        const member = interaction.member;
        const hasStaffRole = member.roles.cache.has(staffRoleId);

        // Si el usuario no tiene el rol de staff, retornar un mensaje de error
        if (!hasStaffRole) {
            return await interaction.reply({
                content: "No tienes permiso para usar este comando.",
                ephemeral: true,
            });
        }
        // Obtener el canal donde se presionó el botón
        const ticketChannel = interaction.channel;

        // Reclamar el ticket
        await interaction.reply({
            content: `El ticket ha sido reclamado por ${interaction.user.tag}.`,
        });

        const memberId = interaction.user.id;
        const memberPermissions = [
            {
                id: memberId,
                permissions: [
                    {
                        id: ticketChannel.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    },
                    {
                        id: memberId,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    },
                ],
            },
        ];

        await ticketChannel.permissionOverwrites.set(memberPermissions);
    },
};
