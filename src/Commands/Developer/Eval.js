const {
    MessageEmbed,
    Message
} = require("discord.js");
const Command = require("../../Structures/Command")
const {
    inspect
} = require("util");

const {
    VultrexHaste
} = require("vultrex.haste")
const haste = new VultrexHaste({
    url: "https://hasteb.in"
})
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['evaluate', 'e'],
            name: 'eval',
            category: 'Developer',
            description: ['Evaluates a code', 'Evaluates a JS Code to something'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: true,
            rateLimit: 3,
            cooldown: 30000
        });
    }
    async run(message, args) {
        if (message.author.id == this.client.config.developerid) {
            if (!args) throw new EvalError(`Please provide a code to eval`)
            try {
                let start = process.hrtime();
                let output = eval(args.join(" "));
                let diff = process.hrtime(start);
                if (output == this.client.token) {
                    output = "Nahh NIBBA i wont give my diamonds";
                }
                if (typeof output != "string") output = inspect(output, {
                    depth: 1
                })
                let inputembed = new MessageEmbed()
                    .setColor(this.client.config.color)
                    .setDescription(
                        `Output:\nExecuted in ${
                        diff[0] > 0 ? `${diff[0]}s` : ""
                        }${diff[1] / 1e6}ms\n\`\`\`javascript\n${output.length > 2000 ? haste.post(output) : output}\n\`\`\``, {
                            maxLength: 2048
                        }
                    );
                message.channel.send(inputembed);
            } catch (e) {
                throw new EvalError(`Could'nt evaluate \n ${e.message}`)
            }
        } else {
            message.channel.send(`bot owner only command`)
        }
    }
};