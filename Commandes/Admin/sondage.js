const { MessageEmbed } = require("discord.js");
const nb = require('./sondage.json')
const fs = require('fs')

module.exports = {
    name: 'sondage',
    description: 'Commande ping',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){

        var text = message.content.split(' ').slice(1).join(' ')
        message.delete(message.author);

        if(!text)
        {
            let sentMessage = await message.reply("Faites la commande \`\`!songade \"sujet_sondage\"\`\`, avec un texte suivant la commande, pour envoyer la suggestion au développeur.")
            message.delete(message.author);
            setTimeout(() => {
                sentMessage.delete();
            }, 10000);
            return;
        }

        let embed = new MessageEmbed()
            .setTitle(`Sondage numéro ${nb['nbr'].numero}`)
            .setDescription(`${text}`)
            .setTimestamp()


        nb['nbr'].numero+=1;
        fs.writeFile("./Commandes/Admin/sondage.json", JSON.stringify(nb), (err) => {
            if(err) console.log(err);
        })

        let msg = await message.channel.send({embeds:[embed]})

        msg.react('<:greenvalid:1179359430509346936>')
        msg.react('<:redcross:1179371066699808828>')
    },
    runSlash: (client, interaction) => {

    }
};