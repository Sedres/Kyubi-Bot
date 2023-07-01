const { Message } = require("discord.js");
const levelSchema = require("../../Schemas/levelSchema");

module.exports = {
    name: "messageCreate",
    once: false,
    /**
     *
     * @param {Message} message
     */
    async execute(message) {
        try {
            if (message.author.bot || message.content.length < 4) {
                return;
            }

            const { guild, author } = message;

            // Verificar si el mensaje está asociado a un servidor (guild)
            if (!guild) {
                return;
            }

            const { id: GuildId } = guild;
            const { id: UserId } = author;

            const randomXp = Math.round(Math.random() * 30);

            const data = await levelSchema.findOneAndUpdate(
                { GuildId, UserId },
                { $inc: { xp: randomXp } },
                { upsert: true, new: true }
            );

            const { xp, limit, level } = data;

            if (xp >= limit) {
                message.channel.send({
                    content: `${
                        author.username
                    }, ¡felicidades! Has alcanzado un nuevo nivel. Tu nivel actual es ${
                        level + 1
                    }.`,
                });

                await levelSchema.findOneAndUpdate(
                    { GuildId, UserId },
                    { $inc: { level: 1, limit: 100 } }
                );
            }
        } catch (error) {
            console.error("Error al actualizar el nivel:", error);
        }
    },
};
