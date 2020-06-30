const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['changeprefix', 'prfx'],
            name: 'prefix',
            category: 'Settings',
            description: ['Changes my prefix for the server'],
            disabled: false,
            clientPerms: [],
            userPerms: ["MANAGE_GUILD"],
            owner: false
        });
    }
    async run(message, args) {
        let prefix = args[0];
        if (!prefix) return;
        this.client.db.set(`prefix_${message.guild.id}`, prefix)
        message.channel.send(new MessageEmbed()
            .setAuthor(`Prefix Change`, message.author.displayAvatarURL())
            .setFooter(`Changed by ${message.author.tag}`, message.guild.iconURL())
            .setTimestamp()
            .setDescription(`Successfully changed the prefix for \`${message.guild.name}\` to \`${prefix}\``))
    }
};