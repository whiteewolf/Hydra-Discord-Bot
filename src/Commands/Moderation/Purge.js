const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['purge', "clean"],
            name: 'purge',
            category: 'Moderation',
            description: [''],
            disabled: false,
            clientPerms: ['MANAGE_MESSAGES'],
            userPerms: ["MANAGE_MESSAGES"],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed().setDescription(`I dont have Manage Messages permissions to execute that command`))
        if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send(new MessageEmbed().setDescription(`You dont have Manage Messages permissions`))
        if (!args[0] || isNaN(args[0]) || args[0] < 2 || args[0] > 100) return message.channel.send(`Please provide a **number** from \`2-100\``);
        const deleted = await message.channel.messages.fetch({
            limit: args[0]
        });
        message.delete();
        message.channel.bulkDelete(deleted);
        return message.channel.send(`Deleted: \`${deleted.size}/${args[0]}\` messages.`)
            .then(m => m.delete({
                timeout: 10000
            }));
    }
};