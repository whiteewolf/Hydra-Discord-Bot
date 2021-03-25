const {
    MessageEmbed,
    Message
} = require("discord.js");
const Command = require("../../Structures/Command")
const {
    inspect
} = require("util");
const {
    Type
} = require('@extreme_hero/deeptype');
const sourcebin = require("sourcebin")
const token = require("../../Structures/BotToken")
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
        const clean = (text) => {
            if (typeof text === 'string') {
                text = text
                    .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                    .replace(/@/g, `@${String.fromCharCode(8203)}`)
                    .replace(new RegExp(this.client.config.token, 'gi'), 'no nibba')
            }
            return text;
        }
        const msg = message;
        if (!args.length) return message.channel.send('You must provide something to evaluate.');
        let code = args.join(' ');
        code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
        let evaled;
        try {
            const start = process.hrtime();
            evaled = await eval(code);
            if (eval instanceof Promise) {
                evaled = await evaled;
            }

            const stop = process.hrtime(start);
            const response = [
                `**Output**: \`\`\`js\n${clean(inspect(evaled, { depth: 0 }))}\n\`\`\``,
                `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
                `**Time:** \`\`\`${(((stop[0] * 1e9) + stop[1])) / 1e6}ms \`\`\``
            ]
            const res = response.join('\n');
            if (res.length < 2000) {
                await message.channel.send(res)
            } else {
                let output = await sourcebin.create([{
                    name: 'output',
                    content: res,
                    languageId: 'js'
                }], {
                    title: 'Evaluation Output',
                    description: 'Outcome of eval command.'
                });
                output = await sourcebin.shorten(output.url);

                await message.channel.send(output);
            }
        } catch (err) {
            console.log(err)
            return message.channel.send(`Error: \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
};