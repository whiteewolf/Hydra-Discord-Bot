const Event = require('../../Structures/Event')

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        })
    }
    run() {
        // console.log(`\n\n${this.client.chalk.green(`Prefix: ${this.client.prefix}`)}\n${this.client.chalk.yellow(`Commands: ${this.client.commands.size}`)}`)
        console.log([
            `${this.client.chalk.red(`[Client] <=> Logged in as ${this.client.user.username}`)}`,
            `${this.client.chalk.bgGreen(`Prefix: ${this.client.prefix}`)}`,
            `${this.client.chalk.bgBlue(`Users: ${this.client.users.cache.size}`)}`,
            `${this.client.chalk.bgCyan(`Servers: ${this.client.guilds.cache.size}`)}`,
            `${this.client.chalk.bgYellow(`Commands: ${this.client.commands.size}`)}`,
            `${this.client.chalk.bgRed(`Events: ${this.client.events.size}`)}`,
        ].join("\n"))
        let act = [
            `${this.client.prefix}help`,
            `Users: ${this.client.users.cache.size}`,
            `Servers: ${this.client.guilds.cache.size}`
        ]
        this.client.user.setStatus('idle')
        let i = 0;
        setTimeout(() => {
            this.client.user.setActivity(act[i++ % act.length], {
                type: "WATCHING",
            });
        }, 3e5);
        setInterval(() => {
            this.client.utils.iblPost(this.client.guilds.cache.size, 2)
        }, 36e4);
        // this.client.utils.iblPost(this.client.guilds.cache.size, 2)
    }
}