const Command = require('../../Structures/Command');
const moment = require('moment');
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
            category: "Information",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let core = os.cpus()[0];
        // let changes = this.client.db.get(`changes`);
        let embedStats = new MessageEmbed()
            .setColor(this.client.config.color)
            .addFields({
                name: "Bot Name",
                value: this.client.user.username,
                inline: true
            }, {
                name: "Developers",
                value: ["473276250815856650"].map(x => this.client.users.cache.get(x).tag),
                inline: true
            }, {
                name: "Bot Servers",
                value: this.client.guilds.cache.size,
                inline: true
            }, {
                name: `Bot Users`,
                value: this.client.users.cache.size,
                inline: true
            }, {
                name: "Uptime",
                value: ms(this.client.uptime, {
                    long: true
                }),
                inline: true
            })
            .setDescription(`Made by: Hydra Development LCL`, this.client.user.displayAvatarURL())
            .setFooter(this.client.config["config"].copyright)
            .setThumbnail(this.client.user.displayAvatarURL())
        message.channel.send(embedStats)
    }
}