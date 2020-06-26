const {
    ShardingManager
} = require('discord.js');
const {
    token
} = require("./Structures/BotToken")
const manager = new ShardingManager('./index.js', {
    token: 'NzE5NDcyNDAzMzU2NDUwODE2.XuTK0w.490tRleq0OR7xxukoF71oh76BQA'
});

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));