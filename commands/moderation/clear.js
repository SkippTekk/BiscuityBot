const { prefix } = require("dotenv");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "clear",
    aliases: ["nuke"],
    category: "moderation",
    description: "Clears messages from the discord.",
    usage: `${process.env.prefix}clear`,
    run: async (client, message, args) => {
        if (message.deletable) message.delete();
        if(!message.member.hasPermission(['MANAGE_MESSAGES'])) return message.reply("No no, clear command not here. \*closes door\*")
        if(!args[0]) return message.channel.send("Nope.").then(m => m.delete({timeout: 5000}));
        message.channel.bulkDelete(args[0]).then(() =>{
            message.channel.send(`Clearing ${args[0]} messages. Gimme a bit.`).then(m => m.delete({timeout: 5000}));
        });
    }
}