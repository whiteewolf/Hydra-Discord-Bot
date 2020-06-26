const Command = require('../../Structures/Command');
const moment = require('moment');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ban', `bannish`],
            name: 'ban',
            category: 'Moderation',
            description: ['Bans a member from the server'],
            disabled: false,
            clientPerms: ['BAN_MEMBERS'],
            userPerms: ["BAN_MEMBERS"],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(new MessageEmbed().setColor(this.client.config.denied).setTitle("Access Denied").setDescription("You didnt mention a member/id to ban"))
        let reason = args.slice(2).join(" ")
        if (!reason) return message.channel.send(new MessageEmbed().setColor(this.client.config.denied).setTitle("Access Denied").setDescription("You didnt provide a reason to ban"))
        let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(`Successfully banned ${member.user.tag}\nReason: ${reason}\nResponsible Moderator/Admin: ${message.author.tag}\nTime: ${moment(message.createdTimestamp).format('LT')} ${moment(message.createdTimestamp).format('LL')}`)
            .setColor(this.client.config.color)
            .setFooter(`Moderation: Ban`)
            .setTimestamp()
        message.guild.members.ban(member, reason)
    }
};