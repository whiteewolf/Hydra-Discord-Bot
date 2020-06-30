const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['supportserver', 'ss'],
            name: 'support',
            category: 'Utilities',
            description: ['Sends an invite for our support server!'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            usage: ""
        });
    }
    async run(message, args) {
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription("Want to join our Support Server?\n**[Click Here](https://discord.gg/MHD94F5)**")
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL())
            .setFooter(this.client.config["config"].copyright, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    }
};