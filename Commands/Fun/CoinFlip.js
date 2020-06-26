const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['flipcoin', 'coin', 'flip'],
            name: 'coinflip',
            category: 'Fun',
            description: ['On what will the coin land? Heads? or Tails?'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let arr = [
            "Tails",
            "Heads"
        ]
        let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2nNo2PMBfZ_H8KXCFL02r8Ip5M0WuHcgz9rl5XY7UraOWrgWq&usqp=CAU';
        let res = arr[Math.floor(Math.random() * arr.length)]
        let embed = new MessageEmbed()
            .setColor(this.client.config.color)
            .setAuthor(`${message.author.tag}'s Coin`, img)
            .setDescription(`Coin landed on\n\`${res}\``)
            .setFooter(this.client.config["config"].copyright)
        message.channel.send(embed)
    }
};