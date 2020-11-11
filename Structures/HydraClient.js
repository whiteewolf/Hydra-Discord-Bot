const {
	Client,
	Collection,
	MessageEmbed
} = require('discord.js');
const Util = require('./Util.js');
const config = require('../config.json');
const {
	token
} = require('./BotToken');
const fetch = require('node-fetch');
const chalk = require('chalk');
const db = require('quick.db');
const {
	Permissions
} = require("discord.js")
// Constants.DefaultOptions.ws.properties.$browser = 'Discord Android'
module.exports = class HydraClient extends Client {

	constructor(options = {}) {
		super({
			shards: "auto"
		});
		this.validate(options);
		this.protocol_1 = false;
		this.commands = new Collection();
		this.events = new Collection();
		this.aliases = new Collection();
		this.utils = new Util(this);
		this.config = config;
		this.chalk = chalk;
		this.owners = config.developerid;
	}
	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new Error('You must pass a prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
		if (!options.defaultPerms) throw new Error('You must pass default perm(s) for the Client.');
		this.defaultPerms = new Permissions(options.defaultPerms).freeze();
	}
	async start() {
		this.utils.loadEvents();
		this.utils.loadCommands();
		super.login(this.token);
	}

};