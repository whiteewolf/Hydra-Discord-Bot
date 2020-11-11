const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const SentientEmbed = require("../../Structures/SentientEmbed")
// const hydra = require("../../images/hydra.jpg")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['hydra'],
            name: 'hydra',
            category: '',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        message.channel.send(new SentientEmbed().setThumbnail(this.client.guilds.cache.get("740304844388302848").iconURL()).customFooter().setDescription(`This bot was made by: ${this.client.config["config"].copyright} and his main developer is: ${this.client.users.cache.get(this.client.config.developerid).tag}`))
    }
};