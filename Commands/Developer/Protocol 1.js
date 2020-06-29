const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['protocol1', 'ID-2717', '2717', 'prtcl1'],
            name: 'protocol_1',
            category: 'Developer',
            description: ['Activates protocol 1 for backstage developing and testing without other people using the bot while this is activated'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true
        });
    }
    async run(message, args) {
        let tickNo = this.client.emojis.cache.get('657695046757384192'),
            tickYes = this.client.emojis.cache.get('657695069498900491')
        let embed = new MessageEmbed()
        if (this.client.protocol_1 == false) {
            this.client.protocol_1 = true;
            embed.setColor("GREEN")
            embed.setDescription(`${tickYes} Activated \`Protocol 1\` Successfully!`)
            message.channel.send(embed)
            console.debug(`[Client] - [${message.createdAt.toLocaleString('en-GB')}] - ${message.author.tag} <=> Executed Activation of Protocol 1 and it Activated Successfully!`)
        } else if (this.client.protocol_1 == true) {
            this.client.protocol_1 = false;
            embed.setColor("RED")
            embed.setDescription(`${tickNo} Disabled \`Protocol 1\` Successfully!`)
            message.channel.send(embed)
            console.debug(`[Client] - [${message.createdAt.toLocaleString('en-GB')}] - ${message.author.tag} <=> Executed Deactivation of Protocol 1 and it Deactivated Successfully!`)
        }
    }
};