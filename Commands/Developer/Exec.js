const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const {
    exec
} = require("child_process")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['exec', 'ex'],
            name: 'exec',
            category: 'Developer',
            description: ['Executes code'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, ...args) {
        if (!args.join(" ")) return message.reply(`You must provide something to execute!`)
        exec(args.join(' '), (stdout, error) => {
            const response = stdout || error;
            message.channel.send(response, {
                split: true,
                code: true
            })
        })
    }
};