const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed,
    version: djs
} = require('discord.js')
const {
    version
} = require("../../package.json")
const os = require("os")
const cpuStat = require("cpu-stat")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['botinfo', 'bi'],
            name: "stats",
            category: "Infomation",
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
            .setColor("BLUE")
            .addField('**General**', [
                `**Commands:** ${this.client.commands.size}`,
                `**Users:** ${this.client.users.cache.size}`,
                `**Servers:** ${this.client.guilds.cache.size}`,
                `**Channels:** ${this.client.channels.cache.size}`,
                `**NodeJS:** ${process.version}`,
                `**Version:** ${version}`,
                `**Discord.JS:** ${djs}`,
                `**Client:** ${this.client.user.tag} (${this.client.user.id})`,
                '\u200b'

            ], true)
            .addField('**System**', [
                `**Platform:** ${this.client.utils.toProperCase(process.platform)}`,
                `**Uptime:** ${ms(os.uptime() * 1000, {long: true})}`,
                `**Memory:**`,
                `\u3000 **Usage:** ${this.client.utils.formatBytes(process.memoryUsage().heapUsed)}`,
                `\u3000 **Total:** ${this.client.utils.formatBytes(process.memoryUsage().heapTotal)}`,

            ], true)
            .setFooter(this.client.config["config"].copyright)
        message.channel.send(embedStats)
    }
}