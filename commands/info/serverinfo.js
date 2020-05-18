const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "serverinfo",
    aliases: ["si"],
    category: "info",
    description: "Gives information about the Server your in",
    usage: `${process.env.prefix}serverinfo`,
    run: async (client, message, args) => {
        let sEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Server Information")
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner**", `${message.guild.owner}`, true)
        .addField("**Member Count**", `${message.guild.memberCount}`, true)
        .addField("**Role Count**", `${message.guild.roles.cache.size}`, true)
        .setTimestamp()
        .setFooter(process.env.footer, message.guild.iconURL())
        .setThumbnail(message.guild.iconURL())
        message.channel.send({embed: sEmbed});
    }
}