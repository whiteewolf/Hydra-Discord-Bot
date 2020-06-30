const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['roleinfo', 'ri'],
            name: 'role',
            category: 'Information',
            description: [''],
            disabled: true,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(`Role | ${role.name}`, message.guild.iconURL())
            .addField("Role Name", `\`${role.name}\``, true)
            .addField("Role ID", `\`${role.id}\``, true)
            .addField("Role Position", `\`${role.position}\``, true)
            .addField(
                "Role Mentionable",
                `\`${role.mentionable ? "Yes" : "No"}\``,
                true
            )
            .addField("Members with the role", `\`${role.members.cache.size}\``, true)
            .addField("Role Hex Color", `\`${role.hexColor}\``, true)
            .addField(
                "Role Created At",
                `\`${new Date(role.createdAt).toLocaleString("en-US")}\``,
                true
            )
            .addField("Role Hoisted", `\`${role.hoist ? "Yes" : "No"}\``, true)
            .addField("Role Managed", `\`${role.managed ? "Yes" : "No"}\``, true)
            .addField(
                "Role Permissions",
                `\`\`\`${await this.client.utils.permissionFormat(role.permissions.toArray()) ||
          "None"}\`\`\``
            );
        return message.channel.send({
            embed: embed
        });
    }
};