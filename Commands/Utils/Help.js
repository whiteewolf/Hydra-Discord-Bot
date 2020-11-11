const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed,
} = require('discord.js')
const {
    readdirSync
} = require('fs')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['cmd'],
            name: "help",
            category: "Utils",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000,
            guildOnly: true
        });
    }
    async run(message, [command]) {
        let e = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(this.client.config.color)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`Prefix in \`${message.guild.name}\` is \`${this.client.config.prefix}\``)
            .setTimestamp()
            .setFooter(`${this.client.config["config"].copyright} - Commands: ${this.client.commands.size}`, this.client.user.displayAvatarURL())
        if (command) {
            let cmd = this.client.commands.get(this.client.aliases.get(command.toLowerCase()) || command.toLowerCase())
            if (!cmd) return;
            // let command = this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())

            let e2 = new MessageEmbed()
                .addField('General', [
                    `Name: \`${cmd.name}\``,
                    `Description: ${cmd.description}`,
                    `Aliases: \`${cmd.aliases.length ? cmd.aliases.map(x => x) : "No Aliases"}\``,
                    `Usage: \`${cmd.usage}\``,
                    `Disabled: \`${cmd.disabled ? "Yes" : "No"}\``,

                ], true)
                .setAuthor(`${this.client.utils.toProperCase(cmd.name)} | Information`, this.client.user.displayAvatarURL())
                .addField('Other', [
                    `Disabled: \`${cmd.disabled ? "Yes" : "No"}\``,
                    `Owner Only: \`${cmd.owner ? "Yes" : "No"}\``,
                ], true)
                .setColor(this.client.config.color)
                .setFooter(this.client.config["config"].copyright)
            message.channel.send(e2)
        } else {
            let categories;
            // if (!this.client.config.developerid.includes(message.author.id)) {
            categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== "Developer" && cmd.disabled).map(x => x.category));
            // } else {
            categories = this.client.utils.removeDuplicates(this.client.commands.map(x => x.category));
            for (const category of categories) {
                e.addField(`> ${this.client.utils.toProperCase(category)}`, `${this.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(" ")}`)
            }
            return message.channel.send(e)
        }
    }
};