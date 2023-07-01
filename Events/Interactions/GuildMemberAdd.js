const { AttachmentBuilder, EmbedBuilder } = require("discord.js");
const Canvas = require("canvas");
const { registerFont } = require("canvas");
const welcome = require("../../Schemas/welcome");

module.exports = {
    name: "guildMemberAdd",
    once: false,
    async execute(member) {
        const { guild } = member;

        const data = await welcome.findOne({ ServerID: guild.id });

        if (!data) return;

        const {
            ChannelID,
            Color,
            TextColor,
            ActivateEmbed,
            Image,
            TextImage,
            TextEmbed,
            EmbedTitle,
        } = data;

        registerFont("LilitaOne-Regular.ttf", { family: "Lilita One" });
        const applyText = (canvas, text) => {
            const ctx = canvas.getContext("2d");

            let fontSize = 80;

            do {
                ctx.font = `${(fontSize -= 10)}px Lilita One`;
            } while (ctx.measureText(text).width > canvas.width - 300);

            return ctx.font;
        };

        const canvas = Canvas.createCanvas(1028, 468);
        const ctx = canvas.getContext("2d");

        const background = await Canvas.loadImage(Image);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.fillStyle = TextColor;
        ctx.textAlign = "center";
        ctx.font = applyText(
            canvas,
            TextImage
                ? `${TextImage}\n${member.user.tag}`
                : `Bienvenid@ ${member.user.tag}`
        );

        ctx.fillText(
            TextImage
                ? `${TextImage}\n${member.user.tag}`
                : `Bienvenid@ ${member.user.tag}`,
            514,
            360
        );

        ctx.beginPath();
        ctx.arc(514, 161, 124, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({ size: 1024, extension: "png" })
        );

        ctx.drawImage(avatar, 388, 35, 250, 250);

        const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
            name: "welcome.png",
        });

        const channel = member.guild.channels.cache.get(ChannelID);

        const messageOptions = {
            content: `${member} Bienvenid@`,
            files: [attachment],
        };

        if (ActivateEmbed) {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: member.client.user.username,
                    iconURL: member.client.user.displayAvatarURL({
                        dynamic: true,
                    }),
                })
                .setColor(Color)
                .setTitle(EmbedTitle || "¡Bienvenid@!")
                .setDescription(TextEmbed || null)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setImage("attachment://welcome.png")
                .setFooter({ text: member.client.user.tag })
                .setTimestamp();

            messageOptions.embeds = [embed];
        }

        await channel.send(messageOptions);
    },
};
