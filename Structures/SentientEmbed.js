/* eslint-disable id-length */
const {
    MessageEmbed
} = require("discord.js")

const s = '\u200b';

module.exports = class SentientEmbed extends MessageEmbed {
    splitFields(contentOrTitle, rawContent) {
        if (typeof contentOrTitle === 'undefined') return this;

        let title,
            content;
        if (typeof rawContent === 'undefined') {
            title = s;
        } else {
            title = contentOrTitle;
            content = rawContent;
        }
        if (Array.isArray(content)) content = content.join("\n")
        if (title === s && !this.description && content.length < 2048) {
            this.description = content;
            return this;
        }

        let x,
            slice;
        while (content.length) {
            if (content.length < 1024) {
                this.fields.push({
                    name: title,
                    value: content,
                    inline: false
                })
                return this;
            }
            slice = content.slice(0, 1024)
            x = slice.lastIndexOf('\n')
            if (x === -1) x = slice.lastIndexOf('')
            if (x === -1) x = 1024;
            this.fields.push({
                name: title,
                value: content.trim().slice(0, x),
                inline: false
            })
            content = content.slice(x + 1);
            title = s;
        }
        return this;
    }
    customFooter() {
        this.footer = "Made by: Hydra Development LCL"
        // this.footer.proxyIconURL = "https://cdn2.vectorstock.com/i/1000x1000/83/26/confident-logo-design-template-vector-21028326.jpg";
        return this;
    }
}