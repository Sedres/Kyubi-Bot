const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rickroll")
        .setDescription(
            "Envía un mensaje directo a un usuario con el enlace de Rickroll"
        )
        .addUserOption((option) =>
            option
                .setName("usuario")
                .setDescription(
                    "Usuario al que se enviará el enlace de Rickroll"
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options } = interaction;
        const targetUser = options.getUser("usuario");

        // Verificar si se seleccionó un usuario válido
        if (!targetUser) {
            await interaction.reply({
                content: "Debes mencionar a un usuario válido.",
                ephemeral: true,
            });
            return;
        }

        // Inicializar la variable cooldowns si no está definida
        if (!interaction.client.cooldowns) {
            interaction.client.cooldowns = new Map();
        }

        // Verificar si ya se ha ejecutado recientemente el comando
        const cooldownTimeMinutes = 30; // 1 minuto de tiempo de espera
        const cooldownTimeMillis = cooldownTimeMinutes * 60 * 1000;
        const lastExecution = interaction.client.cooldowns.get(
            interaction.user.id
        );
        if (lastExecution && Date.now() - lastExecution < cooldownTimeMillis) {
            const remainingTimeMinutes = Math.ceil(
                (cooldownTimeMillis - (Date.now() - lastExecution)) /
                    (60 * 1000)
            );
            await interaction.reply({
                content: `¡Espera ${remainingTimeMinutes} minutos antes de volver a usar este comando!`,
                ephemeral: true,
            });
            return;
        }

        // Establecer el tiempo de espera para el siguiente uso del comando
        interaction.client.cooldowns.set(interaction.user.id, Date.now());

        // Enviar el mensaje directo al usuario seleccionado
        try {
            await targetUser.send(
                `¡Has sido Rickrolled por ${userMention(
                    interaction.user.id
                )}!\nhttps://giphy.com/gifs/rick-roll-lgcUUCXgC8mEo`
            );
            await interaction.reply({
                content: `¡Se ha enviado un mensaje directo con el enlace de Rickroll a ${targetUser}!`,
                ephemeral: true,
            });
        } catch (error) {
            console.error(
                `No se pudo enviar un mensaje directo a ${targetUser.tag}. Error: ${error}`
            );
            await interaction.reply({
                content: `No se pudo enviar un mensaje directo a ${targetUser}. Asegúrate de que tienen los mensajes directos habilitados.`,
                ephemeral: true,
            });
        }
    },
};
