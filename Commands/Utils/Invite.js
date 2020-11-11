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
            category: 'Utils',
            description: ['Creates an invite for you'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        message.channel.send(new MessageEmbed()
            .setColor("BLUE")
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`Invite ${this.client.user.username}\n**[Administrator Permissions (bypass every other permission)](https://discordapp.com/api/oauth2/authorize?client_id=719472403356450816&permissions=8&scope=bot)**\n**[No Permissions](https://discordapp.com/api/oauth2/authorize?client_id=719472403356450816&permissions=0&scope=bot)**`))
    }
};