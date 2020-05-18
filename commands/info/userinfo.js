const { Discord, MessageEmbed } = require("discord.js");
const { getMember, formatDate } = require("../../functions");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    category: "info",
    description: "Gives information on the targeted user.",
    usage: `${process.env.prefix}userinfo`,
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinAt);
        const roles = member.roles
            .cache.filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

            const created = formatDate(member.user.createdAt)

            const embed = new MessageEmbed()
                .setFooter(member.displayName, member.user.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor)

                .addField('Member information', stripIndents`●**  Display name:** ${member.displayName}
                ●** Joined at: ** ${joined}
                ●** Roles:** ${roles}`, true)

                .addField(`User information`, stripIndents`●** ID:** ${member.user.id}
                ●** Username:** ${member.user.username}
                ●** Discord Tag:** ${member.user.tag}
                ●** Created at:** ${created} `, true)

                .setTimestamp()

            if (member.user.presence.game)
                embed.addField(`Currently playing`, `**> Name:** ${member.user.presence.game.name}` );

                message.channel.send(embed);
    }
}