const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
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
    async run(message, args) {
        let e = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor(this.client.config.color)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(`Prefix in \`${message.guild.name}\` is ${this.client.config.prefix}\nCommands arguments:\n\`<>\` => required\n\`[]\` => optional`)
            .setFooter(this.client.config["config"].copyright)
        if (!args[0]) {
            const cat = readdirSync("./Commands/")
            cat.forEach(categories => {
                let directory = this.client.commands.filter(c => c.category === categories)
                if (message.author.id !== this.client.config.developerid) {
                    directory.filter(c => c.category != "Developer")
                }
                let capitalise = this.client.utils.toProperCase(categories)
                e.addField(`[${directory.size}] - ${capitalise}`, directory.map(x => `\`${x.name}\``).join(", "))
            })
            message.channel.send(e)
        } else {
            let command = this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.prefix}help\` for the list of the commands.`))

            let e2 = new MessageEmbed()
                .addField('General', [
                    `Name: ${command.name}`,
                    `Description: ${command.description.join(", ")}`,
                    `Aliases: ${command.aliases.join(", ")}`,

                ], true)
                .addField('Requirements', [
                    `Client Permissions: ${command.clientPerms}`,
                    `Member Permissions: ${command.userPerms}`,
                    `Disabled: ${command.disabled ? "Yes" : "No"}`,
                    `Owner Only: ${command.owner ? "Yes" : "No"}`
                ], true)
                .setColor(this.client.config.color)
                .setFooter(this.client.config["config"].copyright)
            message.channel.send(e2)
        }
    }
};