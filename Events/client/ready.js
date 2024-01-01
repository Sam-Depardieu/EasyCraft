module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client) {
        console.log('Bot on!');

        const devGuild2 = await client.guilds.cache.get('1171888808040595547');       //test bot
        devGuild2.commands.set(client.commands.map(cmd => cmd));
        const devGuild1 = await client.guilds.cache.get('1152701257983733760');       //test bot
        devGuild1.commands.set(client.commands.map(cmd => cmd));
    },
};