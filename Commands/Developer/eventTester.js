const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName(`test-event`)
        .setDescription(
            `Testea los eventos del servidor con el comando de discord`
        )
        .addStringOption((option) =>
            option
                .setName("evento")
                .setDescription("Selecciona el evento a testear")
                .setRequired(true)
                .addChoices(
                    { name: "Guild Member Add", value: "guildMemberAdd" },
                    { name: "Guild Member Remove", value: "guildMemberRemove" }

                    // Agrega aquí más eventos según tus necesidades
                )
        ),

    async execute(interaction, client) {
        const evento = interaction.options.getString("evento");
        const guildMember = interaction.member;
        switch (evento) {
            case "guildMemberAdd":
                client.emit("guildMemberAdd", guildMember);
                break;
            case "guildMemberRemove":
                // Lógica para el evento "guildMemberRemove"
                client.emit("guildMemberRemove", guildMember);
                break;
            // Agrega aquí más casos para cada evento que desees testear

            default:
                interaction.reply({
                    content: "Evento no válido",
                    ephemeral: true,
                });
                return;
        }

        interaction.reply({
            content: `El evento ${evento} se ha ejecutado correctamente`,
            ephemeral: true,
        });
    },
};
