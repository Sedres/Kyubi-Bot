const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Crea un embed personalizado")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) =>
            option
                .setName(`canal`)
                .setDescription(`Canal al que se enviara el embed`)
                .setRequired(true)
                .addChannelTypes(0)
        )
        .addStringOption((option) =>
            option.setName("titulo").setDescription("Titulo del embed")
        )
        .addStringOption((option) =>
            option
                .setName("descripcion")
                .setDescription("Descripcion del embed")
        )
        .addAttachmentOption((option) =>
            option.setName("thumbnail").setDescription("Miniatura del embed")
        )
        .addAttachmentOption((option) =>
            option.setName("imagen").setDescription("Imagen del embed")
        )
        .addStringOption((option) =>
            option.setName("footer").setDescription("Pie de pagina del embed")
        )
        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription("Selecciona el color del embed")
                .setChoices(
                    { name: "Greyple", value: "greyple" },
                    { name: "Green", value: "green" },
                    { name: "Red", value: "red" },
                    { name: "Yellow", value: "yellow" },
                    { name: "Aqua", value: "aqua" }
                )
        )
        .addStringOption((option) =>
            option
                .setName("timestamp")
                .setDescription(
                    "Elige si quieres ponerle cuando se creo el embed"
                )
                .setChoices(
                    { name: "Si", value: "si" },
                    { name: "No", value: "no" }
                )
        )
        .addStringOption((option) =>
            option.setName(`autor`).setDescription(`Poner un autor al embed`)
        ),
    async execute(interaction) {
        let embed = new EmbedBuilder();
        let embed2 = new EmbedBuilder();

        let channel = interaction.options.getChannel(`canal`);
        let titulo = interaction.options.getString(`titulo`);
        let descripcion = interaction.options.getString(`descripcion`);
        let thumbnail = interaction.options.getAttachment(`thumbnail`);
        let imagen = interaction.options.getAttachment(`imagen`);
        let timestamp = interaction.options.getString(`timestamp`);
        let footer = interaction.options.getString(`footer`);
        let color = interaction.options.getString(`color`);
        let autor = interaction.options.getString("autor");

        if (titulo) {
            embed.setTitle(titulo);
        } else {
        }
        if (descripcion) {
            if (descripcion.length > 2048)
                return interaction.reply({
                    embeds: [
                        embed2.setDescription(
                            `⭕La descripcion no puede tener tandos caracteres el maximo son 2048`
                        ),
                    ],
                    ephemeral: true,
                });
            embed.setDescription(descripcion);
        } else {
        }
        if (thumbnail) {
            embed.setThumbnail(thumbnail.url);
        } else {
        }
        if (imagen) {
            embed.setImage(imagen.url);
        } else {
        }
        if (timestamp) {
            if (timestamp === "si") {
                embed.setTimestamp();
            } else if (timestamp === "no") {
            }
        } else {
        }
        if (autor) {
            embed.setAuthor({ name: autor });
        } else {
        }
        if (footer) {
            embed.setFooter({ text: footer });
        } else {
        }
        if (color) {
            if (color === "greyple") {
                embed.setColor("Greyple");
            } else {
            }
            if (color === "green") {
                embed.setColor("Green");
            } else {
            }
            if (color === "red") {
                embed.setColor("Red");
            } else {
            }
            if (color === "yellow") {
                embed.setColor("Yellow");
            } else {
            }
            if (color === "aqua") {
                embed.setColor("Aqua");
            } else {
            }
        } else {
        }
        await channel.send({ embeds: [embed] });
        await interaction.reply({
            embeds: [
                embed2.setDescription("Se ha enviado el embed sin problemas👍"),
            ],
            ephemeral: true,
        });
    },
};
