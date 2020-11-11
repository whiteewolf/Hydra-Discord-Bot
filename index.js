const ITD = require('./Structures/HydraClient');
const config = require('./config.json');
const mongoose = require("mongoose")
mongoose.connect(`mongodb+srv://test:koteto05@cluster0.zpdsy.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
console.log(`[MongoDB] - Connected`)
const client = new ITD(config);
client.start();