const { prefix } = require("dotenv");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "kick",
    aliases: ["boot"],
    category: "moderation",
    description: "Kicks the user from the discord.",
    usage: `${process.env.prefix}kick`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Error. Permissions are a 404.").then(m => m.delete({timeout: 15000}));
    if(!kUser.kickable) return message.channel.send("Can't kick the user...").then(m => m.delete({timeout: 15000}));


    if(!kUser) return message.channel.send("Shooting blanks here...").then(m => m.delete({timeout: 15000}));
    if(!args[1])
        return message.channel.send(`Invalid reason, try again ${message.author.username}`).then(m => m.delete({timeout: 15000}));
    let kreason = args.join(" ").slice(22);

    let kchannel = message.guild.channels.cache.get(`${incidents}`)
    if(!kchannel)
        return message.channel.send(`Can't find the channel ${incidents}`).then(m => m.delete({timeout: 15000}));

    let kickembed = new MessageEmbed()
    .setDescription("~Lah boot~")
    .setColor("#e56b00")
    .addField("Kicked user", kUser.user.tag)
    .addField("Kicked by", `<@${message.author.id}>`)
    .addField("Time", message.createdAt)
    .addField("Reason", kreason)
    .setTimestamp();
    message.guild.member(kUser).kick(kreason);
    return kchannel.send(kickembed);
    }
}