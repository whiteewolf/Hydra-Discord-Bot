const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['hac'],
            name: 'hack',
            category: "Fun",
            description: "Hack someone's account",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || this.client.users.cache.get(args[0]);
        let randomPass = ["iloveshrek", "nissanr34", "toyotasupramk4", "isuck", "iaminlove", "lydiscord", "robloxsucks2222", ""]
        if (!member) return "I cant hack if u dont tell me who to hack"
        let msg = await message.channel.send(`Hacking ${member.user.tag}!`)
        let idk = Math.floor(Math.random() * randomPass.length)
        let time1 = "5s";
        let time2 = "10s";
        let time3 = "15s";
        let time4 = "20s";
        let time5 = "25s";
        let time6 = "30s";
        setTimeout(function () {
            message.channel.send(`Email ${member.user.username}@gmail.com`)
        }, ms(time1))
        setTimeout(function () {
            message.channel.send(`Password ${randomPass[idk]}`)
        }, ms(time2))
        // setTimeout(function () {
        //     member.send(new MessageEmbed().setDescription(`MuHahahahha YOU`).setFooter(this.client.config["config"].copyright))
        // }, ms(time3))
        // setTimeout(function () {
        //     member.send(new MessageEmbed().setDescription(`HAVE BEEN`).setFooter(this.client.config["config"].copyright))
        // }, ms(time4))
        // setTimeout(function () {
        //     message.channel.send(new MessageEmbed().setDescription(`HACKED`).setFooter(this.client.config["config"].copyright))
        // }, ms(time5))
    }
};