const { MessageEmbed } = require("discord.js");
const nb = require('./sondage.json')
const fs = require('fs');
const { green } = require("cli-color");

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
    options: [
        {
            name: 'question',
            description: 'Mettez la question.',
            type: 'STRING',
            required: true
        },
        {
            name: "réponse",
            description: "Mettez les choix possibles au sondage, de forme : \"reponse1,reponse2,reponse3\" (max 7)",
            type: 'STRING',
            require: true
        }
    ],
    async runSlash(client, interaction){
        const question = interaction.options.getString("question");
        const reponses = interaction.options.getString("réponse").split(',');

        const date = new Date();
        const emojis = ['🇦', '🇧', '🇨', '🇩', '🇪', '🇫', '🇬']; // Ajoutez plus d'emojis si nécessaire
        const allRep = reponses.map((reponse, index) => `${emojis[index]} ${reponse}`).join("\n");

        let embed = new MessageEmbed()
            .setTitle(`Sondage proposé par ${interaction.user.tag}`)
            .setColor('GREEN')
            .addFields(
                { name: "Question :", value: `\`\`\`${question}\`\`\`` },
                { name: 'Choix possibles :', value: allRep}
            )
            .setFooter({text:`Sondage proposé à ${date.getHours()}h${date.getMinutes()}`});
        
        
        const msg = await interaction.reply({ embeds: [embed] });
        for(let i=0; i!=reponses.length; i++) await msg.react(emojis[i])

    }
};