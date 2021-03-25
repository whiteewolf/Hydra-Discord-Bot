const {
	Permissions
} = require('discord.js');
module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.disabled = options.disabled || false
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'No Category Set';
		this.usage = `${options.usage || ' '}`.trim() || 'No usage provided.';
		this.userPerms = new Permissions(options.userPerms).freeze();
		this.clientPerms = new Permissions(options.clientPerms).freeze();
		this.guildOnly = options.guildOnly || true;
		this.owner = options.owner || false;
		this.nsfw = options.nsfw || false;
		this.args = options.args || false;
	}

	// eslint-disable-next-line no-unused-vars
	async run(_message, _args) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};