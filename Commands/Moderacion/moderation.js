const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("moderacion")
        .setDescription("Comando de moderación")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("ban")
                .setDescription("Banear a un usuario")
                .addUserOption((option) =>
                    option
                        .setName("usuario")
                        .setDescription("Usuario a banear")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("kick")
                .setDescription("Expulsar a un usuario")
                .addUserOption((option) =>
                    option
                        .setName("usuario")
                        .setDescription("Usuario a expulsar")
                        .setRequired(true)
                )
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName("timeout")
                .setDescription("Dar un tiempo fuera a un usuario")
                .addUserOption((option) =>
                    option
                        .setName("usuario")
                        .setDescription("Usuario a dar tiempo fuera")
                        .setRequired(true)
                )
                .addIntegerOption((option) =>
                    option
                        .setName("tiempo")
                        .setDescription("Tiempo de timeout en minutos")
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === "ban") {
            const user = interaction.options.getUser("usuario");
            const member = interaction.guild.members.cache.get(user.id);

            if (member) {
                member.ban();
                await interaction.reply({
                    content: `Se ha baneado a ${user.tag} del servidor.`,
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "No se encontró al usuario en el servidor.",
                    ephemeral: true,
                });
            }
        } else if (subcommand === "kick") {
            const user = interaction.options.getUser("usuario");
            const member = interaction.guild.members.cache.get(user.id);

            if (member) {
                member.kick();
                await interaction.reply({
                    content: `Se ha expulsado a ${user.tag} del servidor.`,
                    ephemeral: true,
                });
            } else {
                await interaction.reply({
                    content: "No se encontró al usuario en el servidor.",
                    ephemeral: true,
                });
            }
        } else if (subcommand === "timeout") {
            const member = interaction.options.getMember("usuario");
            const user = interaction.options.getUser("usuario");
            const tiempo = interaction.options.getInteger("tiempo");
            if (
                member &&
                !member.permissions.has(PermissionFlagsBits.Administrator)
            ) {
                await interaction.reply({
                    content: `Se ha enviado al rincon de pensar durante ${tiempo} minutos a ${user.tag}.`,
                    ephemeral: true,
                });
                member.timeout(tiempo * 60000);
            } else {
                await interaction.reply({
                    content: `${user.tag} no puede ser silenciado.`,
                    ephemeral: true,
                });
            }
        }
    },
};
