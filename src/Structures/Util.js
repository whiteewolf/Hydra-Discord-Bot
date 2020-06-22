const path = require('path');
const {
	promisify
} = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');
const fetch = require("node-fetch")
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
		const req = fetch(`https://api.vultrex.io/v3/bot/719472403356450816/stats`, {
			headers: {
				"Authorization": "7d8a4768dde40ecb20e275bbe3d8ac5cc6d1e3eb6b1e5f91d16ad689e927c97b97ffd55c8cc8fff0"
			}
		})
		if (req.status !== 200) return [];
		const res = req.json()
		return res;
	}
	postStats() {
		fetch(`https://api.vultrex.io/v3/bot/719472403356450816/stats`, {
			method: "POST",
			headers: {
				"Authorization": "7d8a4768dde40ecb20e275bbe3d8ac5cc6d1e3eb6b1e5f91d16ad689e927c97b97ffd55c8cc8fff0",
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				serverCount: this.client.guilds.cache.size,
				shardCount: this.client.ws.shards.size
			})
		}).then(res => {
			if (res.status !== 200) return console.info("[Vultrex API] Responded with status code not equal to 200")
		}).catch(err => console.error(`[Vultrex API] ${err}`))
	}
	formatBytes(bytes) {
		if (bytes == 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
	}
	async toReverse(str) {
		if (!str) return str = 'No text provided';
		return str.split("").reverse().join("");
	}
	toProperCase(string) {
		return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(" ")
	}
	async removeDuplicates(arr) {
		return [...new Set(arr)]
	}
};