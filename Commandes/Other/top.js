module.exports = {
    name: 'top',
    description: 'Commande pour connaître le top 10 des plus actif sur le serveur',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){
        message.channel.send({embeds: [await client.getClassement(message.author)]})
    },
    async runSlash(client, interaction) {
        interaction.reply({embeds: [await client.getClassement(interaction.user)]})
    }
};