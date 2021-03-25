const Event = require('../../Structures/Event')
const {
    MessageEmbed,
    message: Message
} = require('discord.js')
module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        })
    }
    run(error) {
        console.error(`Error: ${error.stack}`)
    }
}