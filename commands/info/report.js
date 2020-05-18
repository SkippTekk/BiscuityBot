const { Discord, MessageEmbed } = require("discord.js");

module.exports = {
    name: "report",
    aliases: [],
    category: "info",
    description: "Reports a user to the staff.",
    usage: `${process.env.prefix}report`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!rUser) return message.channel.send("Gotta give a report to report huh?").then(m => m.delete({timeout: 15000}));
        if(!args[1])
            return message.channel.send(`Invalid reason, try again ${message.author.username}`).then(m => m.delete({timeout: 15000}));
        let reason = args.join(" ").slice(22);
    
        let rchannel = message.guild.channels.cache.get(`${process.env.reports}`)
        if(!rchannel)
            return message.channel.send(`Can't find the channel ${reports}`).then(m => m.delete({timeout: 15000}));
    
        let reportEmbed = new MessageEmbed()
        .setDescription("Reports")
        .setColor("GREEN")
        .addField("Reported user", rUser.user.tag)
        .addField("Reported by", message.author.tag)
        .addField("Direct Message", message.url)
        .addField("Time", message.createdAt)
        .addField("Reason", reason)
        .setTimestamp();
        
    
        return rchannel.send(reportEmbed);
    }
}