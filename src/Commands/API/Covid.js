const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const fetch = require("node-fetch")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['covid', `c19`, `covid-19`, `corona`, `corona-19`, `corona 19`],
            name: 'corona',
            category: 'API',
            description: ['Shows the COVID-19 stats'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        const NUMBER_REGEX = new RegExp(/(\d)(?=(\d{3})+(?!\d))/g)
        const country = args.join(" ")
        if (!country) return message.channel.send(`Please provide a country name`)
        const res = await fetch(`https://corona.lmao.ninja/v2/countries/${country}`);
        const json = await res.json();

        const dateOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        if (json && json.message) return message.reply(`${country} not found`);

        const embed = new MessageEmbed()
            .setColor("#3180e0")
            .setAuthor(`COVID-19 | ${json.country || country}`, json.countryInfo.flag)
            .addField(`Cases`, `\`${Number(json.cases).toString().replace(NUMBER_REGEX, "$1,")}\``, true)
            .addField(`Active Cases`, `\`${Number(json.active).toString().replace(NUMBER_REGEX, "$1,")}\``, true)
            .addField(`Today Cases`, `\`${Number(json.todayCases).toString().replace(NUMBER_REGEX, "$1,")}\``, true)
            .addField(`Deaths`, `\`${Number(json.deaths).toString().replace(NUMBER_REGEX, "$1,")}\``, true)
            .addField(`Deaths Today`, `\`${Number(json.todayDeaths).toString().replace(NUMBER_REGEX, "$1,")}\``, true)
            .addField(`Recovered`, `\`${Number(json.recovered).toString().replace(NUMBER_REGEX, "$1,")}\``, true)
            .addField(`Tests`, `\`${Number(json.tests).toLocaleString().replace(NUMBER_REGEX, "$1")}\``, true)
            .addField(`Updated as of`, `${new Date(json.updated).toLocaleDateString("en-US", dateOptions)}`, true)
            .addField(`Continent:`, `${json.continent}`, true)
            .setFooter(this.client.config["config"].copyright)
        // console.log(json)

        return message.channel.send({
            embed
        })
    }
};