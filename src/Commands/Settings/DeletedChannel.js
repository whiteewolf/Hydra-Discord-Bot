const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['setdeletedch'],
            name: 'setdeletedchannel',
            category: 'Settings',
            description: ['Set the deleted channel that emits when a user deletes a message'],
            disabled: true,
            clientPerms: [],
            userPerms: ['MANAGE_GUILD'],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        let ch = message.mentions.channels.first() || this.client.channels.cache.get(args[0])
        // this.client.db.set(`deletedch-${message.guild.id}`, ch)
        message.channel.send(new MessageEmbed()
            .setColor(this.client.config.accepted)
            .setDescription(`Set the deleted message channel to ${ch}`))
    }
};