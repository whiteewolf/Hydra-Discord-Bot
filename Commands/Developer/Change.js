const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['changes'],
            name: 'changes',
            category: 'Developer',
            description: ['Cg'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, args) {
        this.client.db.set(`changes`, args.join(" "))
        message.channel.send(`Successfully changed the changes`)
    }
};