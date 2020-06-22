const Command = require('../../Structures/Command');
const moment = require('moment');
const {
    MessageEmbed
} = require('discord.js')
const filterLevels = {
    DISABLED: 'Off',
    MEMBERS_WITHOUT_ROLES: 'No Role',
    ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: '(╯°□°）╯︵ ┻━┻',
    VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const regions = {
    brazil: 'Brazil',
    europe: 'Europe',
    hongkong: 'Hong Kong',
    india: 'India',
    japan: 'Japan',
    russia: 'Russia',
    singapore: 'Singapore',
    southafrica: 'South Africa',
    sydeny: 'Sydeny',
    'us-central': 'US Central',
    'us-east': 'US East',
    'us-west': 'US West',
    'us-south': 'US South'
};
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['si', 'server'],
            name: 'serverinfo',
            category: 'Utilities',
            description: ['Shows the server info'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message) {
        let members = message.guild.members.cache;
        let emojis = message.guild.emojis.cache;
        let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).first(12).map(role => role.toString());
        if (roles > 12) roles += `... 12/${message.guild.roles.cache.size}`;
        let channels = message.guild.channels.cache;
        let em = new MessageEmbed()
            .setColor(this.client.config.color)
            .addField('General', [
                `**Name:** ${message.guild.name}`,
                `**ID:** ${message.guild.id}`,
                `**Region:** ${regions[message.guild.region]}\``,
                `**Boost:** ${message.guild.premiumTier ? `Tier: ${message.guild.premiumTier}` : "None"}`,
                `**Filter Level:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**Verify Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                '\u200b'
            ], true)
            .addField('Statistics', [
                `**Members:** ${members.filter(m => !m.user.bot).size}`,
                `**Bots:** ${members.filter(m => m.user.bot).size}`,
                `**Emojis:** ${emojis.size}`,
                `**Voice Channels:** ${channels.filter(m => m.type === "voice").size}`,
                `**Text Channels:** ${channels.filter(m => m.type === "text").size}`,
                '\u200b'

            ], true)
            .addField('Statuses:', [
                `**Online:** ${members.filter(m => m.presence.status === "online").size}`,
                `**Idle/Away:** ${members.filter(m => m.presence.status === "idle").size}`,
                `**Do Not Disturb:** ${members.filter(m => m.presence.status === "dnd").size}`,
                `**Offline/Invisible:** ${members.filter(m => m.presence.status === "offline").size}`,
                '\u200b'

            ], true)
            .addField("**Roles**", `${roles}`)
            .setFooter(this.client.config["config"].copyright)
            .setColor(this.client.config.color)
        message.channel.send(em)
    }
};