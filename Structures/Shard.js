const {
    ShardingManager
} = require('discord.js');
const {
    token
} = require("./BotToken")
const manager = new ShardingManager('./index.js', {
    token,
    totalShards: 2
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard #${shard.id}`));