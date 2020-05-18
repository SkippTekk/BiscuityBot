const { Discord, MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
    name: "kick",
    aliases: [],
    category: "info",
    description: "Kicks the user from the discord.",
    usage: `${process.env.prefix}kick`,
    run: async (client, message, args) => {
        const logChannel = message.guild.channels.cache.get(`${process.env.removereports}`) || message.channel;

        if(message.deletable) message.delete()

        //no user defined
        if(!args[0]) {
            return message.reply("Gotta tell me who to kick.")
                .then (m => m.delete({timeout: 5000}));
        }
        //no reason defined
        if(!args[1]) {
            return message.reply("Ok, what's the reason?.")
                .then (m => m.delete({timeout: 5000}));
        }
        //not allowed to kick
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("Oi, you got no perms for this. Bugger off.")
                .then (m => m.delete({timeout: 5000}));
        }
        //no bot permissions
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("Oi, I got no perms for this. Please give me.")
                .then (m => m.delete({timeout: 5000}));
        }

        const toKick = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        
        //no user defined
        if(!toKick) {
            return message.reply("Either i'm drunk, or i can't find the person *hic*")
                .then (m => m.delete({timeout: 5000}));
        }

        //can't kick yourself
        //no user defined
        if(!message.author.id === toKick.id) {
            return message.reply("My boot is not effective, your butt must be made of steel.")
                .then (m => m.delete({timeout: 5000}));
        }

        //kicking the person
        if(!toKick.kickable) {
            return message.reply("I can't kick someone that is higher then me bro... *hic*")
                .then (m => m.delete({timeout: 5000}));
        }
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents`●**Kicked member:** ${toKick} (${toKick.id})
            ●**Kicked by:** ${message.member} (${message.member.id})
            ●**Reason:** ${args.slice(1).join(" ")}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 10s.`)
            .setDescription(`Do you want to kick ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 10, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`WHelp, I ran into an error *hic* ${err}`)
                    });

                logChannel.send(embed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`Kick canceled.`)
                    .then(m => m.delete({timeout: 10000}));
            }
        });
    }
}