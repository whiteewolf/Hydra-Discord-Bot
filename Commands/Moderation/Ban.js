const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ban', "banish"],
            name: 'ban',
            category: 'Moderation',
            description: ['Bans a member'],
            disabled: false,
            clientPerms: ["BAN_MEMBERS", "ADD_REACTIONS"],
            userPerms: ["BAN_MEMBERS"],
            owner: false,
            args: `[member] [reason]`
        });
    }
    async run(message, ...args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!member) message.reply(`Member not provided`)
        let reason = args.slice(1).join(" ");
        message.guild.members.ban(member, reason);
        message.channel.send(new MessageEmbed().setAuthor(`Action: Ban`, message.guild.iconURL()).setFooter(`Banned by: ${message.author.tag}`))
    }
};