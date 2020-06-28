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
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        message.channel.createInvite({
            temporary: true,
            reason: "Created Invite for a person in the chat"
        }).then(invite => {
            message.channel.send(new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`Invite Created Successfully\nURL: **${invite.url}**\nCode: **${invite.code}**`))
        })
    }
};