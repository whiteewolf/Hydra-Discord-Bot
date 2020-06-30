const Command = require('../../Structures/Command');
const ms = require('ms');
const {
	MessageEmbed
} = require("discord.js")
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['up'],
			category: "Utilities",
			disabled: false,
			clientPerms: [],
			userPerms: [],
			owner: false,
			rateLimit: 3,
			cooldown: 30000
		});
	}

	async run(message) {
		message.channel.send(new MessageEmbed().setColor("#1f3a93").setFooter(this.client.config["config"].copyright).setDescription(`My uptime is \`${ms(this.client.uptime, { long: true })}\``));
	}
};