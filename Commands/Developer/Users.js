const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['users'],
            name: 'users',
            category: 'Developer',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, [page]) {
        const itemsPerPage = 15;
        const maxPages = Math.ceil(this.client.users.cache.size / itemsPerPage);

        if (page > maxPages) page = 1;

        const items = this.client.users.cache
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((user) => {
                return {
                    id: user.id,
                    name: user.username,
                    at: new Date(user.createdAt).toLocaleString("en-GB", {
                        timeZone: "UTC",
                        hour12: false
                    })
                };
            });

        const toDisplay =
            items.length > itemsPerPage ?
            items.slice(
                (page - 1) * itemsPerPage,
                (page - 1) * itemsPerPage + itemsPerPage
            ) :
            items;

        return message.channel.send(
            `\`\`\`${toDisplay
        .map(
          u =>
            `${u.name.replace(/[^\x00-\x7F]/g, "")}${" ".repeat(
              Math.floor(
                Math.max(...this.client.users.cache.map(g => g.username.length))
              ) + -u.name.replace(/[^\x00-\x7F]/g, "").length
            )} | ${u.id} | ${u.at}`
        )
        .join("\n")}\`\`\`\nPage: **${page}/${maxPages}**`
        );
    }
};