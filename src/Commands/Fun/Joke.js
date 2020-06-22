const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed,
    Message
} = require('discord.js')
const fetch = require("node-fetch")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['joke'],
            name: 'joke',
            category: 'Fun',
            description: ['Return a random joke'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let msg = await message.channel.send("Generating...")

        fetch('https://apis.duncte123.me/joke')
            .then(res => res.json()).then(body => {
                if (!body) return message.channel.send("Something went wrong! Please try again or join our support server if this error still occurs.")
                console.log(body)
                let embed = new MessageEmbed()
                    .setColor(this.client.config.color)
                    .setTitle(body.data.title)
                    .setURL(body.data.url)
                    .setDescription(body.data.body)
                    .setFooter(this.client.config["config"].copyright)

                msg.edit(embed)
            })
    }
};