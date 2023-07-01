const {
    SlashCommandBuilder,
    SlashCommandStringOption,
    ApplicationCommandType,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dmdelete")
        .setDescription("Deletes last DM Bot Message in your DMs.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Deletes last DM Bot Message.")
                .setRequired(true)
        ),
    async execute(interaction) {
        const mentionedUser =
            interaction.options.getUser("user") || interaction.user;
        if (!mentionedUser)
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription("Member not found")
                        .setColor("#f80b0b"),
                ],
                ephemeral: true,
            });

        const dmchannel =
            mentionedUser.dmChannel || (await mentionedUser.createDM());
        dmchannel.messages.fetch({ limit: 100 }).then((messages) => {
            const botMessages = messages.filter((m) => m.author.bot);
            let c = botMessages.size;
            interaction
                .reply({ content: `Deleting ${c} DMs.`, fetchReply: true })
                .then((ms) => {
                    botMessages.forEach((msg) => {
                        msg.delete()
                            .then(() => {
                                c--;
                                if (c === 0)
                                    ms.edit("DMs deleted successfully.");
                            })
                            .catch((err) => {
                                ms.edit(
                                    `Error occurred while deleting DMs.\n${err}`
                                );
                            });
                    });
                });
        });
    },
};
