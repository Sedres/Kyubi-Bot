const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("listservers")
        .setDescription(
            "Muestra la lista de servidores con las Ids de los servidor en los que estado tu bot."
        ),
    async execute(interaction) {
        const serverslist = interaction.client.guilds.cache.map(
            (guild) => `> **-** ${guild.name} \`(ID: ${guild.id})\``
        );
        const embed = new EmbedBuilder()
            .setTitle("Lista de servidores")
            .setDescription(
                `El bot se encuentra en los siguientes servidores:\n${serverslist.join(
                    "\n"
                )}`
            )
            .setColor("Red");
        await interaction.reply({ embeds: [embed] });
    },
};
