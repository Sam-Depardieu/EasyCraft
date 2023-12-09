const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'suggest',
    description: 'Vous avez une idée pour le bot? Utilisez cette commande',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){

        var text = message.content.split(' ').slice(1).join(' ')

        if(!text)
        {
            let sentMessage = await message.reply("Faites la commande \`\`!suggest \"votre_suggestion\"\`\`, avec un texte suivant la commande, pour envoyer la suggestion au développeur.")
            message.delete(message.author);
            setTimeout(() => {
                sentMessage.delete();
            }, 10000);

            return;
        }
        let owner = await client.users.fetch('314379016880783370');
        
        let embed = new MessageEmbed()
            .setTitle(`Suggestion de ${message.author.username}(${message.author.id})`)
            .setDescription(`${text}`)
            .setTimestamp()
            
        owner.send({embeds: [embed]})

    },
    async runSlash(client, interaction) {

    }
};