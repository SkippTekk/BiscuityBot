const { Client, Collection, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs")
const botconfig = require("./botconfig.json")

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    pathe: __dirname + "/.env"
});

["commands"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

//bot boots with console spit for any file errors. and status changes
client.on("ready", () => {
    console.log(`${client.user.username} is online and in ${client.guilds.cache.size} server with ${client.users.cache.size} people`);

    let statuses = [
        `${process.env.PREFIX}botinfo for info!`,
        `${process.env.PREFIX}help`,
        `${client.users.cache.size} users!`
    ]
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "WATCHING"});
    }, 3000)
});


client.on("message", async message =>{
    const prefix1 = process.env.PREFIX;

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix1)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix1.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    //command handler stuff
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
    
    //prefix command stuff
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

    if(!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

})

//welcome and leave

client.on("guildMemberAdd", async member =>{
    let welcomechannel = member.guild.channels.find(`name`, "welcome-leave");
    welcomechannel.send(`Welcome to the ${message.guild.name} discord, Be sure to read the left side for the rules ${member}`)
})
client.on("guildMemberRemove", async member =>{
    let welcomechannel = member.guild.channels.find(`name`, "welcome-leave");
    welcomechannel.send(`Whelp, ${member} didn't like being in ${message.guild.name}. How sad.`)
})

//channel creations and removal
client.on("channelCreate", async channel =>{
    let channelCreate = channel.guild.channels.cache.get(`${process.env.reports}`)
    channelCreate.send(`${channel} has been created`)
})
client.on("channelDelete", async channel =>{
    let channelDelete = channel.guild.channels.cache.get(`${process.env.reports}`)
    channelDelete.send(`channel: **${channel.name}** was deleted.`)
})
// message changes
client.on("messageUpdate", async(oldMessage, newMessage) => {
    if(oldMessage.content === newMessage.content){
        return;
    }
        let logEmbed = new MessageEmbed()
    .setTitle("Edited Message.")
    .setColor("GREEN")
    .addField("●**Old Message:**", `${oldMessage.content}`)
    .addField("●**New Message:**", `${newMessage.content}`)
    .setTimestamp()
    .setFooter(process.env.footer)
    let loggingChannel = newMessage.guild.channels.cache.get(process.env.botlogs)
    if(!loggingChannel) return;

    loggingChannel.send(logEmbed);
})


//message deletions
client.on('messageDelete', message =>{
    if(!message.partial) {
        const channel = client.channels.cache.get(process.env.botlogs);
        if(channel) {
            const embed = new MessageEmbed()
            .setTitle(`Message that was deleted.`)
            .addField(`Content`,`\n${message.content}`)
            .addField(`Author`, `${message.author.tag} (${message.author.id})`)
            .addField(`Channel`, `${message.channel.name} (${message.channel.id})`)
            .setTimestamp()
            .setFooter(process.env.footer);
            channel.send(embed);
        }
    }
})


client.login(process.env.TOKEN);