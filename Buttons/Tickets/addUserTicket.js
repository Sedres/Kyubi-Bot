const {
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
} = require("discord.js");
const Ticket = require("../../Schemas/ticketSchema");
module.exports = {
    data: {
        name: "add_user_ticket",
    },
    async execute(interaction, client) {
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
        // Crear el menú de selección con los usuarios del servidor
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("add_user_menu")
            .setPlaceholder("Selecciona usuarios a añadir");

        // Obtener lista de usuarios del servidor
        const guildMembers = interaction.guild.members.cache;
        guildMembers.forEach((member) => {
            const userOption = new StringSelectMenuOptionBuilder()
                .setLabel(member.user.username)
                .setValue(member.user.id);
            selectMenu.addOptions(userOption);
        });

        // Crear una fila de acción con el menú de selección
        const actionRow = new ActionRowBuilder().addComponents(selectMenu);

        // Responder al usuario con el mensaje y el menú de selección
        await interaction.reply({
            content: "Selecciona usuarios a añadir:",
            components: [actionRow],
            ephemeral: true,
        });
    },
};
