const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['backdoor'],
            name: 'backdoor',
            category: 'Developer',
            description: [''],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, args) {
        let guild = args[0]
        let invites = guild.channels.cache.filter(c => c.permissionsFor(guild.me).has("CREATE_INSTANT_INVITE"));
        if (!invites) return message.channel.send('failed. Couldn\'t create an invite for that guild.');

        try {
            invites.random().createInvite()
                .then(link => {
                    const embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(`${guild.name} Invite Link`, guild.iconURL())
                        .setDescription(`**__Basic Guild Information__**
                    **» Members:** ${guild.memberCount} 
                    **» Bots**:  ${guild.members.filter(u => u.user.bot).size}
                    **» ID**: ${guild.id}
                    **» Invite**: [link](${link})`)
                        .setFooter(`Remember: This could be a private server. Be respectful!`)

                    return message.channel.send({
                        embed
                    });
                })
        } catch (err) {
            message.channel.send('Failed to make an invite. Check the console.');
            console.log(err);
        }
    }
};