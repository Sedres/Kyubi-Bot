const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
} = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Mira mis comandos"),

    async execute(interaction) {
        const cmp = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder().setCustomId("Menu").addOptions([
                {
                    label: "Menu Principal",
                    description: "Menu Principal.",
                    value: "uno",
                    emoji: "⚙️",
                },
                {
                    label: "Configuracion",
                    description: "Comandos de Configuracion",
                    value: "dos",
                    emoji: "🔧",
                },
                {
                    label: "Moderacion",
                    description: "Comandos de Moderacion",
                    value: "tres",
                    emoji: "⛔",
                },
                {
                    label: "Interaccion",
                    description: "Comandos de Interaccion",
                    value: "cuatro",
                    emoji: "❤️",
                },
            ])
        );
        const user = interaction.user;

        const embed = new EmbedBuilder()
            .setTitle("Menu de ayuda")
            .setImage(
                "https://media.discordapp.net/attachments/1086311971005136936/1091908401870680124/New_Project_1.png?width=1025&height=183"
            )
            .setColor("#2c2d31")
            .setDescription(`**Por favor Selecciona una opcion**`);

        let mensaje = await interaction.reply({
            embeds: [embed],
            components: [cmp],
        });

        const ifiltro = (i) => i.user.id === interaction.user.id;

        let collector = interaction.channel.createMessageComponentCollector({
            filter: ifiltro,
        });

        const embed1 = new EmbedBuilder()
            .setTitle("Comandos de Configuración")
            .setDescription(
                "Estos son algunos de los comandos que te ayudaran a configurar el bot"
            )
            .addFields({
                name: "setup-welcome",
                value: "Este comando te ayudara a configurar el canal de bienvenida del servidor",
            })
            .setFooter({ text: "KyubiBot©" })
            .setTimestamp()
            .setColor("#2c2d31");

        const embed2 = new EmbedBuilder()
            .setTitle("Comandos de Moderación")
            .setDescription("Estos son los comandos de moderacion del bot")
            .addFields(
                {
                    name: "ban",
                    value: "Baneara un usuario que tu elijas",
                },
                {
                    name: "clear",
                    value: "Borrara un numero de mensajes determinado puede ser de un usuario determinado o mensajes en general",
                },
                {
                    name: "kick",
                    value: "Expulsara a un usuario del servidor de discord (Ten en cuenta que esto no es permanente)",
                },
                {
                    name: "timeout",
                    value: "Restringira las enteracciones en el discord de un usuario por un tiempo",
                }
            )
            .setFooter({ text: "KyubiBot©" })
            .setTimestamp()
            .setColor("#2c2d31");

        const embed3 = new EmbedBuilder()
            .setTitle("Comandos de Interacción")
            .setDescription("Comandos generales que interactuan con el bot")
            .addFields(
                {
                    name: "tweet",
                    value: "Creara un tweet falso con tu imagen (Es divertido)",
                },
                {
                    name: "userinfo",
                    value: "Este comando proporciona informacion sobre un usuario que se especifique",
                },
                {
                    name: "help",
                    value: "Vuelve a crear este mismo menu",
                },
                {
                    name: "embedcreate",
                    value: "Este comando crea un embed en el canal que elijas (Comando solo para administradores)",
                }
            )
            .setFooter({ text: "KyubiBot©" })
            .setTimestamp()
            .setColor("#2c2d31");

        collector.on("collect", async (i) => {
            if (i.values[0] === "uno") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed], components: [cmp] });
            }
        });

        collector.on("collect", async (i) => {
            if (i.values[0] === "dos") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed1], components: [cmp] });
            }
        });

        collector.on("collect", async (i) => {
            if (i.values[0] === "tres") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed2], components: [cmp] });
            }
        });

        collector.on("collect", async (i) => {
            if (i.values[0] === "cuatro") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed3], components: [cmp] });
            }
        });
    },
};
