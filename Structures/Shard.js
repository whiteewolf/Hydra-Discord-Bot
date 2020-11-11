const {
    ShardingManager
} = require('discord.js');
const {
    token
} = require("./BotToken")
const manager = new ShardingManager('./index.js', {
    token,
    totalShards: 3,
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Shard #${shard.id} is running!`));