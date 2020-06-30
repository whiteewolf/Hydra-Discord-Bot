const Command = require('../../Structures/Command');
const {
	MessageEmbed
} = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pong'],
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
		const msg = await message.channel.send(new MessageEmbed().setColor("GREEN").setDescription(`Pinging...`).setFooter(this.client.config["config"].copyright));
		const latency = msg.createdTimestamp - message.createdTimestamp;
		let embed = new MessageEmbed()
			.setColor("BLUE")
			.setDescription(`Ponged! :ping_pong:\nBot Latency: \`${latency}ms\`\nAPI Latency: \`${Math.round(this.client.ws.ping)}ms\``)
			.setFooter(this.client.config["config"].copyright)
		// const choices = ['Is this really my ping?', 'Is this okay? I can\'t look!', 'I hope it isn\'t bad!'];
		// const response = choices[Math.floor(Math.random() * choices.length)];

		msg.edit(embed);
	}

};