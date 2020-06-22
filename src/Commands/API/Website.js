const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const {
    lookup
} = require("dns")
const {
    promisify
} = require("util")
const {
    URL
} = require("url")
const IP = promisify(lookup);
const fetch = require("node-fetch")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['website'],
            name: 'website',
            category: 'API',
            description: ['Shows stats of a certain website'],
            disabled: true,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        // const res = await fetch(URL.href);
        // if (!URL.hostname || !URL.host) return message.channel.send(`Something errored.`);

        // const {
        //     address,
        //     family
        // } = await IP(URL.hostname);
        // let em = new MessageEmbed()
        //     .setColor("#3180e0")
        //     .setAuthor(`Website | ${URL}`, message.author.displayAvatarURL({
        //         dynamic: true
        //     }))
        //     .addField(`Online`, res.ok ? "`Yes`" : "`No`", true)
        //     .addField(`Status Code`, `\`${res.status} (${res.statusText})\``, true)
        //     .addField(`Content Type`, res.ok ? `\`${res.headers.get("content-type")}\`` : "`Unknown`", true)
        //     .addField(`Href`, `\`${URL.href}\``, true)
        //     .addField(`Host`, `\`${URL.host}\``, true)
        //     .addField(`Host Name`, `\`${URL.hostname}\``, true)
        //     .addField(`Protocol`, `\`${URL.protocol}\``, true)
        //     .addField(`Port`, `\`${URL.port || "`3000`"}\``, true)
        //     .addField(res.ok ? `IPv${family}` : "IPv4", `\`${address}\`` || "`Unknown`", true)
        message.channel.send(`Still in Development...`)
    }
};