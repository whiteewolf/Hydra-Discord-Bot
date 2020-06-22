const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['votes', 'voting'],
            name: 'votes',
            category: 'Information',
            description: ['Checks for XenoN votes in Vultrex!'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || this.client.users.cache.get(args[0]) || message.member;
        let vot = this.client.utils.getStats()
        let m = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription(`Is someone voted for ${this.client.user.username}? ${vot.includes(member.id) ? `${member.user.tag} Yes` : `${member.user.tag} No`}`)
        message.channel.send(m)
    }
};