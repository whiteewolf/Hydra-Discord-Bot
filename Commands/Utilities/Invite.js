const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['invite', 'createinvite'],
            name: 'invite',
            category: 'Utilities',
            description: ['Creates an invite for you'],
            disabled: true,
            clientPerms: ["CREATE_INSTANT_INVITE"],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Invite ${this.client.user.usernam}\n**[Administrator Permissions (bypass every other permission)]()**\n**[All Required Pe]()**`))
    }
};