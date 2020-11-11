const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const m = require("../../Models/member_logs")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['member_logs', 'mlogs'],
            name: 'member_logs',
            category: 'Settings',
            description: ['Sets all member logs to a channel'],
            disabled: true,
            clientPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
            userPerms: ["MANAGE_GUILD"],
            owner: false
        });
    }
    async run(message, ...args) {
        let channel = message.mentions.channels.first();
        m.findOne({
            Guild: message.guild.id,
            channel: channel
        }, async (err, data) => {
            if (err) throw err;
            if (data) {
                data.channel = channel.id;
                data.save();
                message.channel.send(`Set Member Logs to ${channel}`)
            }
        })
    }
};