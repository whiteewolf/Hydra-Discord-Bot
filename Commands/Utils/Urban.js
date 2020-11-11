const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const ud = require("relevant-urban")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['urban'],
            name: 'urban',
            category: 'Utils',
            description: [''],
            disabled: true,
            clientPerms: [],
            usage: "word",
            userPerms: [],
            owner: false,
            nsfw: true,
            args: "word"
        });
    }
    async run(message, ...args) {
        let worder = args[0];
        if (!worder) return message.channel.send("Specify a word")
        let defin = await ud(args.join(' ')).catch(e => {
            message.channel.send("Word not found")
            return;
        });
        let embed = new MessageEmbed()
            .setTitle(defin.word)
            .setURL(defin.urbanURL)
            .setDescription(defin.definition)
            .addField("Example", defin.example)
            .addField("Author", defin.author)
            .setColor(this.client.config.color)
        message.channel.send(embed)
    }
};