const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const fetch = require("node-fetch")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['docs', 'djs', "discordjs"],
            name: 'docs',
            category: 'Information',
            description: [''],
            disabled: false,
            clientPerms: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
            userPerms: [],
            owner: false
        });
    }
    async run(message, ...args) {
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`;

        const doc = await fetch(url)
        const embed = await doc.json();
        if (!embed || embed.error) {
            return message.reply(`"${args}" could not be found`)
        }
        if (!message.guild) return message.channel.send({
            embed
        })

        const msg = await message.channel.send({
            embed
        })
        msg.react("❌")

        let react;
        try {
            react = await msg.awaitReactions((reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id, {
                max: 1,
                errors: ['time']
            })

        } catch (error) {
            msg.reactions.removeAll()
        }

        if (react && react.first()) {
            msg.delete();
        }
        return message;
    }
};