const path = require('path');
const {
	promisify
} = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const fetch = require("node-fetch")
const {
	VultrexClient
} = require('vultrex.api');
const vultrex = new VultrexClient('7d8a4768dde40ecb20e275bbe3d8ac5cc6d1e3eb6b1e5f91d16ad689e927c97b97ffd55c8cc8fff0', '719472403356450816');
module.exports = class Util {

	constructor(client) {
		this.client = client;
	}

	isClass(input) {
		return typeof input === 'function' &&
			typeof input.prototype === 'object' &&
			input.toString().substring(0, 5) === 'class';
	}

	get directory() {
		return `${path.dirname(require.main.filename)}${path.sep}`;
	}

	async loadCommands() {
		return glob(`${this.directory}Commands/**/*.js`).then(commands => {
			for (const commandFile of commands) {
				delete require.cache[commandFile];
				const {
					name
				} = path.parse(commandFile);
				const File = require(commandFile);
				if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't export a class.`);
				const command = new File(this.client, name.toLowerCase());
				if (!(command instanceof Command)) throw new TypeError(`Comamnd ${name} doesnt belong in Commands.`);
				this.client.commands.set(command.name, command);
				if (command.aliases.length) {
					for (const alias of command.aliases) {
						this.client.aliases.set(alias, command.name);
					}
				}
			}
		});
	}
	getStats() {
		vultrex.getVotes('719472403356450816').then(console.log);
	}
	postStats() {
		vultrex.post(this.client.guilds.cache.size)
		vultrex.post(this.client.ws.shards.count)
	}
	formatBytes(bytes) {
		if (bytes == 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
	}
	toReverse(str) {
		if (!str) return str = 'No text provided';
		return str.split("").reverse().join("");
	}
	toBetterCase(str) {
		return str.replace(/_/g, " ").toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())
	}
	toProperCase(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(" ")
	}
	removeDuplicates(arr) {
		return [...new Set(arr)]
	}
	missingPerms = (member, perms) => {
		const missingPerms = member.permissions
			.missing(perms)
			.map(str => `\`${str.replace(/_/g, " ").toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}\``);

		return missingPerms.length > 1 ?
			`${missingPerms.slice(0, -1).join(", ")} and ${missingPerms.slice(-1)[0]}` :
			missingPerms[0];
	};
	async permissionFormat(permissions) {
		const result = permissions.map(
			str =>
			`${str
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b(\w)/g, char => char.toUpperCase())}`
		);

		return result.length > 1 ?
			`${result.slice(0, -1).join(", ")} and ${result.slice(-1)[0]}` :
			result[0];
	}
};