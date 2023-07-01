module.exports = {
    data: {
        name: "add_user_menu",
    },
    async execute(interaction, client) {
        const selectedUsers = interaction.values;
        const ticketChannel = interaction.channel;
        const permissions = ticketChannel.permissionOverwrites;
        const mentionedUsers = [];

        selectedUsers.forEach((userId) => {
            const user = interaction.guild.members.cache.get(userId);
            if (user) {
                permissions.create(user, {
                    ViewChannel: true,
                    SendMessages: true,
                });
                mentionedUsers.push(user.toString()); // Agregar la mención del usuario al arreglo
            }
        });

        await interaction.reply({
            content: `Usuario añadido correctamente: ${mentionedUsers.join(
                ", "
            )}`, // Mencionar a los usuarios añadidos
        });
    },
};
