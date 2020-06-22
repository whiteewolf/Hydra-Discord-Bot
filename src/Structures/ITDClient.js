const {
	Client,
	Collection,
	MessageEmbed
} = require('discord.js');
const Util = require('./Util.js');
const config = require('../config.json')
// const db = require("quick.db")
const {
	token
} = require("./BotToken");
const fetch = require("node-fetch")
const Constants = require("discord.js/src/util/Constants")
Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
module.exports = class ITDClient extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		// this.db = db;
		this.validate(options);
		this.commands = new Collection();
		this.snipes = new Map();
		this.aliases = new Collection();
		this.utils = new Util(this);
		this.config = config;
		this.once('ready', () => {
			console.log(`Logged in as ${this.user.username}!`);
			this.user.setActivity(`${this.config.prefix}help`, {
				type: 'WATCHING',
				browser: "Discord Android"
			})
		})
		setInterval(this.utils.postStats, 3e5)
		this.on('error', error => {
			console.error('The WebSocket encountered an error:', error);
		});
		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);
			if (!message.guild || message.author.bot) return;
			if (message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\``);
			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;
			if (!message.content.startsWith(this.prefix)) return;
			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command.disabled) return message.channel.send(new MessageEmbed().setColor(this.config.denied).setDescription(`**Access Denied**\n Command ${command.name} is disabled`))
			if (
				command.owner &&
				!this.config.developerid.includes(message.author.id)
			) {
				return message.channel.send(new MessageEmbed().setTitle("Access Denied", message.author.displayAvatarURL()).setColor(this.config.denied).setFooter(this.config["config"].copyright).setDescription(`Sorry, you are not ${this.config.developer} to use this command`))
			}
			let result = this.missingPerms(message.member, command.userPerms);
			if (
				command.userPerms &&
				!message.member.permissions.has(command.userPerms) &&
				!this.config.developerid.includes(message.author.id)
			)
				return message.channel.send(new MessageEmbed().setTitle("Access Denied", message.author.displayAvatarURL()).setColor(this.config.denied).setFooter(this.config["config"].copyright).setDescription(`You dont have ${result} permissions...`))
			result = this.missingPerms(message.guild.me, command.clientPerms);
			if (
				command.clientPerms &&
				!message.guild.me.permissions.has(command.clientPerms) &&
				!this.config.developerid.includes(message.author.id)
			)
				return message.channel.send(new MessageEmbed().setTitle("Access Denied", message.author.displayAvatarURL()).setColor(this.config.denied).setFooter(this.config["config"].copyright).setDescription(`I dont have ${result} permissions...`))
			if (command) {
				command.run(message, args);
			}
		});
	}
	missingPerms = (member, perms) => {
		const missingPerms = member.permissions
			.missing(perms)
			.map(str => `\`${str.replace(/_/g, " ").toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

		return missingPerms.length > 1 ?
			`${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
			missingPerms[0];
	};
	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
	}

	async start() {
		this.utils.loadCommands();
		super.login(token);
	}

};