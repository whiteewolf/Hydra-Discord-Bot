module.exports = class Command {

	constructor(client, name, options = {}) {
		this.client = client;
		this.name = options.name || name;
		this.aliases = options.aliases || [];
		this.disabled = options.disabled || false
		this.description = options.description || 'No description provided.';
		this.category = options.category || 'Utilities';
		this.usage = `${this.client.config.prefix}${this.name} ${options.usage}` || 'No usage provided.';
		this.clientPerms = options.clientPerms || "None";
		this.userPerms = options.userPerms || "None";
		this.owner = options.owner || false;
		// this.reasondis = options.reasondis || "Bugs"
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		throw new Error(`Command ${this.name} doesn't provide a run method!`);
	}

};