const {
    EmbedBuilder,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
} = require("discord.js");
const Marriage = require("../../Schemas/marrySchema");

const Gifs = [
    "https://media.giphy.com/media/d42fBz7HHxLS2gDVsy/giphy.gif",
    "https://media.giphy.com/media/TR3abToJDTBII/giphy.gif",
    "https://media.giphy.com/media/10wwy1cJ8j2aD6/giphy.gif",
    "https://media.giphy.com/media/f8UQzwnOU1SGrpQ81J/giphy.gif",
    "https://media.giphy.com/media/OZwkhBXihXfWZQjCFm/giphy.gif",
];

const commandCount = new Map(); // Usamos un mapa en lugar de un objeto para almacenar el recuento de usos del comando por usuario

module.exports = {
    premiumOnly: false,
    data: new SlashCommandBuilder()
        .setName("marry")
        .setDescription("¡Cásate con un usuario!")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("¿Con quién te quieres casar?")
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("divorce")
                .setDescription("¿Quieres solicitar el divorcio?")
        ),
    async execute(interaction) {
        const { options, member } = interaction;
        const user = options.getUser("target");
        const userId = member.user.id;

        const existingMarriage = await Marriage.findOne({
            userId,
            targetId: user.id,
        });

        if (existingMarriage) {
            const wantDivorce = options.getBoolean("divorce");

            if (wantDivorce) {
                await existingMarriage.deleteOne();
                interaction.reply({
                    content: `Te has divorciado de ${user}. La información del matrimonio ha sido eliminada.`,
                });
                return;
            } else {
                interaction.reply({
                    content:
                        "Ya estás casado o has sido rechazado anteriormente.",
                    ephemeral: true,
                });
                return;
            }
        }

        if (!commandCount.has(userId)) {
            commandCount.set(userId, 0);
        }

        commandCount.set(userId, commandCount.get(userId) + 1);

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("accept")
                .setLabel("Aceptar")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("reject")
                .setLabel("Rechazar")
                .setStyle(ButtonStyle.Danger)
        );

        const randomGif = Gifs[Math.floor(Math.random() * Gifs.length)];

        const message = await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("#37AADF")
                    .setImage(randomGif)
                    .setDescription(
                        `${member} quiere casarse contigo, ${user}! ¿Aceptas?`
                    ),
            ],
            components: [row.toJSON()],
        });

        const filter = (interaction) =>
            interaction.isButton() && interaction.user.id === user.id;

        const collector = message.createMessageComponentCollector({
            filter,
            time: 15000,
            max: 1,
            errors: ["time"],
        });

        collector.on("collect", async (interaction) => {
            if (
                interaction.customId === "accept" ||
                interaction.customId === "reject"
            ) {
                const marriage = new Marriage({
                    userId,
                    targetId: user.id,
                    accepted: interaction.customId === "accept",
                });

                await marriage.save();
            }
        });

        collector.on("end", (collected, reason) => {
            if (reason === "time") {
                interaction.editReply({
                    content:
                        "El tiempo para responder ha expirado. La propuesta ha sido cancelada.",
                    components: [],
                });
            }
        });
    },
};
