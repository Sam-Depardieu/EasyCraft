module.exports = {
    name: 'test',
    description: 'say',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){

        message.channel.send(`${client.getGuild(message.guild).logChannelID === undefined}`)
    },
}