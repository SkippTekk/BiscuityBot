const { Discord, MessageEmbed } = require("discord.js");
const fs = require("fs")

module.exports = {
    name: "prefix",
    aliases: [],
    category: "",
    description: "Sets the server's prefix. Guild owner ONLY",
    usage: `${process.env.prefix}uptime`,
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_GUILD', {checkAdmin: false, checkOwner: true})) return message.reply("Only Owner of the discord can change this.").then(m => m.delete({timeout: 15000}));
if(!args[0] || args[0 === "help"]) return message.reply(`Usage: ${process.env.prefix} [new prefix setting] Shits fucking broken right now. Default is still ${process.env.prefix}`);

let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

prefixes[message.guild.id] = {
    prefixes: args[0]
};

fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) =>{
    if (err) console.log(err)
});

let sEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Prefix settings")
    .setDescription(`Set to ${args[0]}`);

    message.channel.send(sEmbed).then(m => m.delete({timeout: 5000}))
    }
}