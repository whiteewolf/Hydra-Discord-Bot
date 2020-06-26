const Command = require('../../Structures/Command');
const ms = require('ms');
const {
    MessageEmbed
} = require('discord.js')
const weather = require("weather-js")
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['weather', 'meteo'],
            name: 'weather',
            category: 'API',
            description: ['Gives the weather for the current city'],
            disabled: false,
            clientPerms: [],
            userPerms: [],
            owner: false
        });
    }
    async run(message, args) {
        weather.find({
            search: args.join(" "),
            degreeType: "C"
        }, function (err, result) {
            if (err) message.channel.send(err)

            //If the place entered is invalid
            if (result.length === 0) {
                message.channel.send(new MessageEmbed()
                    .setColor(this.client.config.denied)
                    .setDescription("**Please enter a valid location**"))
            }

            //Variables
            let current = result[0].current //Variable for the current part of the JSON Output
            let location = result[0].location //This is a variable for the location part of the JSON Output

            //Sends weather log in embed
            let embed = new MessageEmbed()
                .setDescription(`**${current.skytext}**`) //How the sky looks like
                .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
                .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
                // .setColor(this.client.config.color) //Sets the color of the embed
                .addField("Timezone", `UTC${location.timezone}`, true) //Shows the timezone
                .addField("Degree Type", location.degreetype, true) //Shows the degrees in Celcius
                .addField("Temperature", `${current.temperature}`, true)
                .addField("Feels like", `${current.feelslike} Degrees`, true)
                .addField("Winds", current.winddisplay, true)
                .addField("Humidity", ` ${current.humidity}%`, true)
                .addField("Day", `${current.day}`, true)
                .addField("Date", `${current.date}`, true)

            //Display when it's called
            message.channel.send(embed)

        })
    }
}