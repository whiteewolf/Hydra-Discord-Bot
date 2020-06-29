const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['8ball'],
            name: '8ball',
            category: 'Fun',
            description: ['Mighty 8ball gives an answer to a question'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let replies = ["Yes", "No", "I don't know", "Ask again later!", "Cyka", "I am not sure!", "Pls No", "You tell me", "Without a doubt", "Cannot predict now", "Without a doubt", "Maybe", "Maybe yes", "maybe no"];
        let img = "https://magic-8ball.com/assets/images/magicBallStart.png";
        let result = replies[Math.floor((Math.random() * replies.length))];
        let question = args.join(" ");
        if (question.length > 1000) return message.channel.send(new MessageEmbed()
            .setColor(this.client.config.denied)
            .setDescription(`Please provide a shorter question`))
        if (!question) return message.channel.send(new MessageEmbed()
            .setColor(this.client.config.denied)
            .setDescription(`Please provide a question`))
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setAuthor(`${message.author.tag} asked Mighty 8ball a question`, message.author.displayAvatarURL())
            .addField('Question', question)
            .addField('Answer', result)
            .setThumbnail(img)
            .setFooter(this.client.config["config"].copyright)
        message.channel.send(embed)
    }
};