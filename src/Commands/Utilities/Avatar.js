const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['pfp', 'av'],
            category: "Utilities",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        message.channel.send(new MessageEmbed()
            .setColor(member.displayHexColor)
            .setTitle(member.user.tag)
            .setImage(member.user.displayAvatarURL({
                dynamic: true,
                size: 4096
            }))
            .setFooter(this.client.config["config"].copyright))
    }
};