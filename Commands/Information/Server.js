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
            category: 'Information',
            description: ['Shows the server info'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message) {
        let members = message.guild.members.cache;
        let emojis = message.guild.emojis.cache;
        let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).first(7).map(role => role.toString());
        if (roles > 7) roles += `... 7 / ${message.guild.roles.cache.size}`;
        let channels = message.guild.channels.cache;
        let em = new MessageEmbed()
            .setColor(this.client.config.color)
            .addField(`Server Name:`, message.guild.name, true)
            .addField(`Server Owner:`, message.guild.owner.user.tag, true)
            .addField(`Members:`, message.guild.memberCount, true)
            .addField(`Channels:`, message.guild.channels.cache.size, true)
            .addField(`Region:`, regions[message.guild.region], true)
            .addField(`Verification Level:`, verificationLevels[message.guild.verificationLevel], true)
            .addField("**Roles**", `${roles}`)
            .setFooter(this.client.config["config"].copyright)
            .setColor(this.client.config.color)
            .setThumbnail(message.guild.iconURL())
        message.channel.send(em)
    }
};