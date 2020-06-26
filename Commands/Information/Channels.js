const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['channelsmap', 'mapchannels', 'chmap'],
            name: 'channels',
            category: 'Information',
            description: ['Maps all the guild channels with their ID'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let ch = message.guild.channels.cache.filter(f => f.type !== 'voice').map(x => `\`${x.name + " :: " + x.id}\``).join("\n");
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setDescription(ch)
        message.channel.send(`idk come later for channels   `)
    }
};