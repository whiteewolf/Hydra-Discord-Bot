const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed,
    Message: message
} = require('discord.js')
const {
    readdirSync
} = require('fs')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['cmd'],
            name: "help",
            category: "Utilities",
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, [command]) {
        let e = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(this.client.config.color)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`Prefix in \`${message.guild.name}\` is \`${this.client.config.prefix}\`
            Command Arguments:
            \`<>\` => Required
            \`[]\` => Optional`)
            .setTimestamp()
            .setFooter(`${this.client.config["config"].copyright} +=+ Commands: ${this.client.commands.size}`, this.client.user.displayAvatarURL())
        if (command) {
            let cmd = this.client.commands.get(this.client.aliases.get(command.toLowerCase()) || command.toLowerCase())
            if (!cmd) return;
            // let command = this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())

            let e2 = new MessageEmbed()
                .addField('General', [
                    `Name: \`${cmd.name}\``,
                    '\u200b',
                    `Description: \`${cmd.description}\``,
                    '\u200b',
                    `Aliases: \`${cmd.aliases.length ? cmd.aliases.map(x => x) : "No Aliases"}\``,
                    '\u200b',
                    `Usage: \`${cmd.usage}\``,
                    '\u200b',
                    `Disabled: \`${cmd.disabled ? "Yes" : "No"}\``,
                    '\u200b',
                    `Owner Only: \`${cmd.owner ? "Yes" : "No"}\``,
                ], true)
                .setAuthor(`${this.client.utils.toProperCase(cmd.name)} | Information`, this.client.user.displayAvatarURL())
                // .addField('Requirements', [
                //     `Client Permissions: \`${cmd.clientPerms || "No Required Permissions"}\``,
                //     '\u200b',
                //     `Member Permissions: \`${cmd.userPerms || "No Required Permissions"}\``,
                //     '\u200b',
                //     `Disabled: \`${cmd.disabled ? "Yes" : "No"}\``,
                //     '\u200b',
                //     `Owner Only: \`${cmd.owner ? "Yes" : "No"}\``,
                //     '\u200b'
                // ], true)
                .setColor(this.client.config.color)
                .setFooter(this.client.config["config"].copyright)
            message.channel.send(e2)
        } else {
            let categories;
            if (!this.client.config.developerid.includes(message.author.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== "Developer").map(x => x.category));
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(x => x.category));
            }
            for (const category of categories) {
                e.addField(`- \`${this.client.utils.toProperCase(category)}\``, `\`\`\`${this.client.commands.filter(cmd => cmd.category === category).map(cmd => cmd.name).join(" / ")}\`\`\``)
            }
            return message.channel.send(e)
        }
    }
};