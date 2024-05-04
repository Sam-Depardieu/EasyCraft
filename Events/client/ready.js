module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client) {
        console.log('Bot on!');

        const devGuild2 = await client.guilds.cache.get('1173681116524335185');       //test bot
        devGuild2.commands.set(client.commands.map(cmd => cmd));

    },
};