const path = require('path');
const {
	promisify
} = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command');
const Event = require("./Event")
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
	resolveMember(member) {
		if (!member) return null;
		return member.guild.members.get(member) || member.guild.members.find(m => {
			let match = member.match(/<@!?(\d{17,19})>/);
			if (match && m.id === match[1]) return true;
			return m.displayName.toLowerCase().includes(member.toLowerCase()) || m.user.username.toLowerCase().includes(member.toLowerCase());
		});
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
	formatBytes(bytes) {
		if (bytes == 0) return '0 Bytes';
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
	}
	toReverse(str) {
		if (!str) str = 'No text provided';
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
	checkOwner(target) {
		return this.client.owners.includes(target);
	}

	comparePerms(member, target) {
		return member.roles.highest.position < target.roles.highest.position;
	}

	formatPerms(perm) {
		return perm
			.toLowerCase()
			.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
			.replace(/_/g, ' ')
			.replace(/Guild/g, 'Server')
			.replace(/Use Vad/g, 'Use Voice Acitvity');
	}
	iblPost(servers, shards) {
		fetch(`https://infinitybotlist.com/api/bots/${this.client.user.id}`, {
			method: "POST",
			headers: {
				"authorization": "",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				servers: servers,
				shards: shards
			})
		}).then(async res => console.log(await res.json()))
	}
	formatArray(array, type = 'conjunction') {
		return new Intl.ListFormat('en-GB', {
			style: 'short',
			type: type
		}).format(array);
	}
	async loadEvents() {
		return glob(`${this.directory}Events/**/*.js`).then(events => {
			for (const EventFile of events) {
				delete require.cache[EventFile];
				const {
					name
				} = path.parse(EventFile);
				const File = require(EventFile);
				if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class.`);
				const event = new File(this.client, name.toLowerCase());
				if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesnt belong in Events Folder.`);
				this.client.events.set(event.name, event);
				event.emitter[event.type](name, (...args) => event.run(...args));
			}
		});
	}
	getTimestamp() {
		let date = new Date(Date.now());

		let hours = date.getUTCHours().toString().padStart(2, '0');
		let minutes = date.getUTCMinutes().toString().padStart(2, '0');
		let seconds = date.getSeconds().toString().padStart(2, '0');

		return `[${hours}:${minutes}:${seconds}]`;
	}
}
