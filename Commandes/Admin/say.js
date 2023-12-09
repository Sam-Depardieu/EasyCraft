module.exports = {
    name: 'say',
    description: 'say',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){

        message.delete(message.author);
            
        var text = message.content.split(' ').slice(1).join(' ')

        if(args[0] === "@everyone" || args[0] === "@here") {
            message.reply("Essaie pas de faire ça !")
        }else{
            if(!text) return message.reply('Hey salut')
            message.channel.send(text)
            console.log(`${message.author.username} a fait la commande *say: ${text}`)
        }
    },
    options: [
        {
            name: 'message',
            description: 'Mettez le message à envoyer.',
            type: 'STRING',
            required: false
        }
    ],
    runSlash(client, interaction) {
            
        var text = interaction.options.getString("message");
        const everyone = text.includes("@everyone");
        const here = text.includes("@here");
        if(everyone || here) {
            interaction.reply("Essaie pas de faire ça !")
        }else{
            if(!text) return interaction.reply('Hey salut')
            interaction.reply(text)
            console.log(`${interaction.user.username} a fait la commande *say: ${text}`)
        }
    }
}