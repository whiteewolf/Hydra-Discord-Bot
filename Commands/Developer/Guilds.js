const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['servers', 'guilds'],
            name: 'servers',
            category: 'Developer',
            description: ['Maps the servers the bot is in'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, args) {
        let guilds = this.client.guilds.cache;
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription(`\`\`\`${guilds.map(x => x.name + ' <=> ' + x.memberCount + ' <=> ' + x.id).join("\n")}\`\`\``)
            .setAuthor(`${guilds.size} Servers`)
        message.channel.send(embed)
    }
};