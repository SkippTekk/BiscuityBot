const { prefix } = require("dotenv");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    aliases: [],
    category: "moderation",
    description: "bans a user from the discord",
    usage: `${process.env.prefix}ban`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Your not strong enough for the Hammah.").then(m => m.delete({timeout: 15000}));
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!bUser.bannable) return message.channel.send("Can't ban the user...").then(m => m.delete({timeout: 15000}));
    
    
        if(!bUser) return message.channel.send("Shooting blanks here...").then(m => m.delete({timeout: 15000}));
        if(!args[1])
            return message.channel.send(`Invalid reason, try again ${message.author.username}`).then(m => m.delete({timeout: 15000}));
        let breason = args.join(" ").slice(22);
    
        let bchannel = message.guild.channels.cache.get(`${incidents}`)
        if(!bchannel)
            return message.channel.send(`Can't find the channel ${incidents}`).then(m => m.delete({timeout: 15000}));
    
        let banembed = new MessageEmbed()
        .setDescription("~Ban hammah has spoken~")
        .setColor("#e56b00")
        .addField("Banned user", bUser.user.tag)
        .addField("Banned by", `<@${message.author.id}>`)
        .addField("Time", message.createdAt)
        .addField("Reason", breason)
        .setTimestamp();
    
        message.guild.member(bUser).ban(breason);
        return bchannel.send(banembed);
    }
}