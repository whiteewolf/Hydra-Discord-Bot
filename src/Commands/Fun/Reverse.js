const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['reverse'],
            name: 'reverse',
            category: 'Fun',
            description: ['Reverses a text'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let rev = args.join(" ").split("").reverse().join("")
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription(`\`${rev}\``)
            .setAuthor(`${message.author.tag} Reversed A Text`, message.author.displayAvatarURL())
        message.channel.send(embed)
    }
};