const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['addrole'],
            name: 'addrole',
            category: 'Moderation',
            description: ['Adds a role to the user specified'],
            disabled: false,
            clientPerms: ["MANAGE_ROLES"],
            userPerms: ["MANAGE_ROLES"],
            owner: false
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!member) return message.channel.send('No member specified')
        let reason = args.join(" ")
        if (!reason) reason = "No reason provided."
        let embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`${message.author.tag} added ${member.user.tag} a role: ${role}`)
        message.channel.send(embed)
        member.roles.add(role)
    }
};