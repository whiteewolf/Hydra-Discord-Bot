const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['announce', 'news'],
            name: 'announce',
            category: 'Moderation',
            description: [''],
            disabled: true,
            clientPerms: ["SEND_MESSAGES"],
            userPerms: ["MANAGE_MESSAGES"],
            owner: false
        });
    }
    async run(message, args) {
        let title = args.join(" ").split(" | ")
    }
};