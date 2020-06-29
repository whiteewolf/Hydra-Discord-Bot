const ITD = require('./Structures/ITDClient');
const config = require('./config.json');

const client = new ITD(config);
client.start();