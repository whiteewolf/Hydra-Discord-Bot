const Command = require('../../Structures/Command');
const moment = require('moment');
const {
    MessageEmbed
} = require('discord.js')
const flags = {
    DISCORD_EMPLOYEE: '<:Staff:714522641570070529> Discord Employee',
    DISCORD_PARTNER: '<:DiscordPartner:714522665385459714> Discord Partner',
    BUGHUNTER_LEVEL_1: '<:BugHunter:714522708687192066> Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: '<:BugHunter:714522708687192066> Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: '<:1694_hypesquadbravery:714522464151142581> House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: '<:9792_hypesquad_balance:714522618551861248> House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: '<:4228_discord_bot_dev:714522536481652786> Verified Bot Developer'
};
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['userinfo'],
            name: 'whois',
            category: 'Infomation',
            description: ['Shows the selected member info'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let st = {
            online: "Online",
            idle: "Idle/Away",
            dnd: "Do Not Disturb",
            offline: "Invisible/Offline"
        }
        const userFlags = member.user.flags.toArray();
        let embed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true
            }))
            .setColor(this.client.config.color)
            .addField('General User Information', [
                `**Username & Tag:** ${member.user.tag}`,
                `**ID:** ${member.user.id}`,
                `**Flags / Badges:** ${userFlags.map(flag => flags[flag]).join(', ') || "None"}`,
                `**Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**Device:** ${Object.keys(member.presence.clientStatus).map(x => x.replace(/(\b\w)/gi, c => c.toUpperCase())) ? Object.keys(member.presence.clientStatus).map(x => x.replace(/(\b\w)/gi, c => c.toUpperCase())) : "None"}`,
                `**Status:** ${st[member.presence.status]}`,
                `**Bot:** ${member.user.bot ? "Yes" : "No"}`,
                '\u200b'
            ], true)
            .addField('General Member Information', [
                `**Joined:**  ${moment(member.joinedTimestamp).format('LT')} ${moment(member.joinedTimestamp).format('LL')} ${moment(member.joinedTimestamp).fromNow()}`,
                `**Roles:** ${member.roles.cache.filter(f => f.name !== '@everyone').sort((a, b) => b.position - a.position).map(x => x.toString()).join(", ") || "None"}`,
                `**Boosting Server:** ${moment.utc(member.premiumSince).format("LLLL") || "No"}`,
                `**Nickname:** ${member.nickname || "None"}`,
                '\u200b'
            ], true)
        message.channel.send(embed)
    }
}