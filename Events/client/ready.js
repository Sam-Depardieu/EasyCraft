module.exports = {
    name: 'ready',
    once: 'true',
    async execute(client) {
        console.log('Bot on!');

        // Instantané
        const devGuild = await client.guilds.cache.get('1173681116524335185');       //easycraft
        devGuild.commands.set(client.commands.map(cmd => cmd));

        const devGuild2 = await client.guilds.cache.get('1171888808040595547');       //test bot
        devGuild2.commands.set(client.commands.map(cmd => cmd));
    },
};