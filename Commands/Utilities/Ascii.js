const Command = require('../../Structures/Command');
const ms = require('ms');
const figlet = require('figlet');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ascii', 'asciitext'],
            name: 'ascii',
            category: 'Utilities',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        figlet(args.join(" "), function (err, data) {
            if (err) return message.channel.send('Something went wrong!');

            return message.channel.send(`\`\`\`\n${data}\`\`\``);
        })
    }
}