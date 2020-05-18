const { prefix } = require("dotenv");
const { Discord, MessageEmbed } = require("discord.js");
module.exports = {
    name: "ban",
    aliases: [],
    category: "moderation",
    description: "bans a user from the discord",
    usage: `${process.env.prefix}ban`,
    run: async (client, message, args) => {
        //shit goes here
    }
}