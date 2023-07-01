const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChatInputCommandInteraction,
} = require(`discord.js`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription(`Mira la informacion o avatar de un miembro.`)
        .addSubcommand((command) =>
            command
                .setName("info")
                .setDescription(
                    "Revisa toda la informacion de un mimebro en este servidor."
                )
                .addUserOption((option) =>
                    option
                        .setName(`user`)
                        .setDescription(
                            `el miembro del cual quieres ver la info`
                        )
                        .setRequired(false)
                )
        )
        .addSubcommand((command) =>
            command
                .setName("avatar")
                .setDescription(
                    "Muestra tu avatar o el del miembro que menciones"
                )
                .addUserOption((option) =>
                    option
                        .setName("miembro")
                        .setDescription(
                            "Menciona al miembro cuyo avatar quieres ver"
                        )
                )
        )
        .addSubcommand((command) =>
            command
                .setName("banner")
                .setDescription(`Revisa avatar de un miembro del servidor.`)
                .addUserOption((option) =>
                    option
                        .setName(`user`)
                        .setDescription(
                            `el miembro del cual quieres ver el avatar`
                        )
                        .setRequired(false)
                )
        )
        .setDMPermission(false),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, client) {
        const { options } = interaction;
        const sub = options.getSubcommand();

        switch (sub) {
            case "info":
                try {
                    const formatter = new Intl.ListFormat(`en-GB`, {
                        style: `narrow`,
                        type: `conjunction`,
                    });

                    const badges = {
                        Staff: "<:staff:1094433297309904918>",
                        Partner: "<:partner:1093601664822431764>",
                        Hypesquad: "<:hypeSquad:1093590253949956288>",
                        BugHunterLevel1: "<:bugHunter1:1093591180236828805>",
                        HypeSquadOnlineHouse1: "<:bravery:1093582894116651080>",
                        HypeSquadOnlineHouse2:
                            "<:brillance:1093582275918180383>",
                        HypeSquadOnlineHouse3: "<:balance:1093582077158494218>",
                        PremiumEarlySupporter:
                            "<:emoji_13:1069621437792530482>",
                        TeamPseudoUser: "tpu",
                        BugHunterLevel2: "<:bugHunter2:1069620226309754930>",
                        VerifiedBot: "vb",
                        VerfiedDeveloper: "<:developer:948601613545771088>",
                        CertifiedModerator: "cm",
                        BotHttpInteractions: "bhi",
                        ActiveDeveloper: "<:pdev:1093369015449174026>",
                    };

                    const user =
                        interaction.options.getUser(`user`) || interaction.user;
                    const userFlags = user.flags.toArray();
                    const member = await interaction.guild.members.fetch(
                        user.id
                    );
                    const topRoles = member.roles.cache
                        .sort((a, b) => b.position - a.position)
                        .map((role) => role)
                        .slice(0, 3);
                    const banner = await (
                        await client.users.fetch(user.id, { force: true })
                    ).bannerURL({ size: 4096 });
                    const booster = member.premiumSince
                        ? `<:boost:1096539075399401583> Yes`
                        : `No`;
                    const ownerE = `<:owner:1093585132063031380>`;
                    const devs = `<:dev:1093369054405861509>`;
                    const owners = `245339452464037888`;
                    const MutualServers = [];
                    const JoinPosition = await interaction.guild.members
                        .fetch()
                        .then(
                            (Members) =>
                                Members.sort((a, b) => a.joinedAt - b.joinedAt)
                                    .map((User) => User.id)
                                    .indexOf(member.id) + 1
                        );

                    for (const Guild of client.guilds.cache.values()) {
                        if (Guild.members.cache.has(member.id)) {
                            MutualServers.push(
                                `[${Guild.name}](https://discord.com/guilds/${Guild.id})`
                            );
                        }
                    }

                    const embed = new EmbedBuilder()
                        .setAuthor({
                            name: `information`,
                            iconURL: member.displayAvatarURL(),
                        })
                        .setTitle(
                            `**${member.user.tag}** ${
                                userFlags.length
                                    ? formatter.format(
                                          userFlags.map(
                                              (flag) => `${badges[flag]}`
                                          )
                                      )
                                    : ` `
                            }`
                        )
                        .setColor(member.displayHexColor)
                        .setThumbnail(member.displayAvatarURL())
                        .setDescription(
                            `**Id** - ${
                                member.id
                            }\n• **Boosted** - ${booster}\n• **Top Role** - ${topRoles}\n• **Joined** - <t:${parseInt(
                                member.joinedAt / 1000
                            )}:R>\n• **Discord User** - <t:${parseInt(
                                user.createdAt / 1000
                            )}:R>`
                        )
                        .addFields({
                            name: `Banner`,
                            value: banner ? " " : "None",
                        })
                        .setImage(banner)
                        .setFooter({
                            text: `${
                                member
                                    ? `Join Position - ${JoinPosition} | `
                                    : ""
                            }Mutual Servers - ${MutualServers.length}`,
                        });

                    if (member.id == interaction.guild.ownerId) {
                        embed.setTitle(
                            `**${member.user.tag}** ${ownerE} ${
                                userFlags.length
                                    ? formatter.format(
                                          userFlags.map(
                                              (flag) => `${badges[flag]}`
                                          )
                                      )
                                    : ` `
                            }`
                        );
                    }
                    if (owners.includes(member.id)) {
                        embed.setTitle(
                            `**${member.user.tag}** ${devs} ${
                                userFlags.length
                                    ? formatter.format(
                                          userFlags.map(
                                              (flag) => `${badges[flag]}`
                                          )
                                      )
                                    : ` `
                            }`
                        );
                    }
                    if (
                        owners.includes(member.id) &&
                        member.id == interaction.guild.ownerId
                    ) {
                        embed.setTitle(
                            `**${member.user.tag}** ${devs} ${ownerE} ${
                                userFlags.length
                                    ? formatter.format(
                                          userFlags.map(
                                              (flag) => `${badges[flag]}`
                                          )
                                      )
                                    : ` `
                            }`
                        );
                    }

                    await interaction.reply({ embeds: [embed] });
                } catch (error) {
                    const embed2 = new EmbedBuilder()
                        .setAuthor({
                            name: `${client.user.username}`,
                            iconURL: `${client.user.displayAvatarURL()}`,
                        })
                        .setThumbnail(client.user.displayAvatarURL())
                        .setDescription(
                            `Este usuario no se encuentra en este servidor, por favor ingresa un mimebro de este servidor :3`
                        )
                        .setColor("Random")
                        .setTitle(`<a:cancel:1102948049006887064> | Error`)
                        .setFooter({
                            text: `${client.user.tag} || ${client.ws.ping}ms`,
                            iconURL: client.user.displayAvatarURL(),
                        })
                        .setTimestamp();

                    await interaction.reply({ embeds: [embed2] });
                }

                break;

            case "avatar":
                try {
                    const member = interaction.options.getUser("miembro");
                    if (member) {
                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `${member.tag}`,
                                iconURL: `${member.displayAvatarURL()}`,
                            })
                            .setTitle("Aqui esta su avatar...")
                            .setColor("Random")
                            .setImage(
                                `${member.displayAvatarURL({
                                    dynamic: true,
                                    size: 4096,
                                })}`
                            )
                            .setTimestamp()
                            .setFooter({
                                text: `${client.user.tag} || ${client.ws.ping}ms`,
                                iconURL: client.user.displayAvatarURL(),
                            });

                        interaction.reply({ embeds: [embed] });
                    } else {
                        const embed = new EmbedBuilder()
                            .setAuthor({
                                name: `${interaction.user.tag}`,
                                iconURL: `${interaction.user.displayAvatarURL()}`,
                            })
                            .setTitle("Aqui esta tu avatar...")
                            .setColor("Random")
                            .setImage(
                                `${interaction.user.displayAvatarURL({
                                    dynamic: true,
                                    size: 4096,
                                })}`
                            )
                            .setTimestamp()
                            .setFooter({
                                text: `${client.user.tag} || ${client.ws.ping}Ms`,
                                iconURL: client.user.displayAvatarURL(),
                            });

                        interaction.reply({ embeds: [embed] });
                    }
                } catch (error) {
                    interaction.reply({
                        content:
                            ":x: | Algo salio mal, por favor intenta de nuevo.",
                        ephemeral: true,
                    });
                }
                break;

            case "banner":
                try {
                    const user =
                        interaction.options.getUser(`user`) || interaction.user;
                    const member = await interaction.guild.members.fetch(
                        user.id
                    );
                    const banner = await (
                        await client.users.fetch(user.id, { force: true })
                    ).bannerURL({ size: 4096 });

                    const embed = new EmbedBuilder()
                        .setColor("Random")
                        .setAuthor({
                            name: `${user.tag}`,
                            iconURL: member.displayAvatarURL(),
                        })
                        .addFields({
                            name: `Aqui esta su banner...`,
                            value: banner ? " " : "No tiene banner",
                        })
                        .setImage(banner)
                        .setTimestamp()
                        .setFooter({
                            text: `${client.user.tag} || ${client.ws.ping}ms`,
                            iconURL: client.user.displayAvatarURL(),
                        });

                    await interaction.channel.sendTyping(),
                        await interaction.reply({ embeds: [embed] });
                } catch (error) {
                    interaction.reply({
                        content:
                            ":x: | Algo salio mal, por favor intenta de nuevo.",
                        ephemeral: true,
                    });
                }
        }
    },
};
