module.exports = {
    name: "guildCreate",
    once: false,
    async execute(client, guild, message) {
        if(await client.getGuild(guild)) return;
        await client.createGuild(guild);
    },
}