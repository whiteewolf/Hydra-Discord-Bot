const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed,
    version
} = require('discord.js')
const os = require("os")
const cpuStat = require("cpu-stat")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['botinfo', 'bi'],
            name: "stats",
            category: "Utilities",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        let embedStats = new MessageEmbed()
            // .setAuthor(this.client.user.username)
            .setTitle("__**Stats:**__")
            .setColor("#1f3a93")
            .addField("Memory Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
            .addField("Uptime ", `${ms(this.client.uptime, {long: true})}`, true)
            .addField("Users", `${this.client.users.cache.size}`, true)
            .addField("Servers", `${this.client.guilds.cache.size}`, true)
            .addField("Channels ", `${this.client.channels.cache.size}`, true)
            .addField("Discord.js", `v${version}`, true)
            .addField("Node", `${process.version}`, true)
            .addField("Developers", this.client.config.developer, true)
            .addField("Admins", this.client.config.admins, true)
            .addField("CPU", `\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
            .addField("Arch", `\`${os.arch()}\``, true)
            .addField("Platform", `\`\`${this.client.utils.toProperCase(os.platform())}\`\``, true)
            .addField("API Latency", `${(this.client.ws.ping)}ms`, true)
            .setFooter(this.client.config["config"].copyright)
        message.channel.send(embedStats)
    }
}