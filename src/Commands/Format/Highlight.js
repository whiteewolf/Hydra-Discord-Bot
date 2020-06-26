const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['highlight', `highl`],
            name: 'highlight',
            category: 'Format',
            description: ['Highlights a text'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        if (!args.join(" ")) {
            return message.channel.send(":x: " + "| Please Enter Something For The Bot To Highligh With Syntax")
        }
        message.channel.send("```" + args.join(" ") + "```");
    }
}