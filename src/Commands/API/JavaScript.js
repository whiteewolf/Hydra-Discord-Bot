const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const fetch = require("node-fetch")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['js', `javascript`, `Javascript`],
            name: 'javascript',
            category: 'API',
            description: ['Fetches an info about the search string'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        const query = args.join(" ")
        if (!query) return message.channel.send(`Please provide a query`)
        const res = await fetch(`https://mdn.pleb.xyz/search?q=${encodeURIComponent(query)}`);
        const {
            Summary,
            URL,
            Title
        } = await res.json();

        return message.channel.send(
            new MessageEmbed()
            .setColor(this.client.config.color)
            .setAuthor(`${Title}`, `https://developer.mozilla.org${URL}`, message.author.displayAvatarURL())
            .setDescription(Summary.replace(/<[^>]*>?/gm, ""))
            .setFooter(this.client.config["config"].copyright)
        )
    }
};