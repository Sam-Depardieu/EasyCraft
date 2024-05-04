const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require('ms');
const cg = require('./quizzMc/minecraft.json');
const cls = require('./quizzMc/classement.json')
const nb = require('./quizzMc/nbrQuizz.json')
const fs = require('fs');

module.exports = {
    name: 'quizz',
    description: 'Questions sur le thème de Minecraft',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args) {
        message.delete()
        
        let randomQ = nb['nbr'].numero
        if(args[0]) randomQ = args[0]
        const reac = ["<:lettreA:1184941756647751710>", "<:lettreB:1184941752793169931>", "<:lettreC:1184941748607262842>", "<:lettreD:1184941743276310709>"];
        const reacNames = ["lettreA", "lettreB", "lettreC", "lettreD"]; 
        const previousAnswers = {};
        let winner = [];
        let i = 0;
        const question = cg[randomQ];

        if(!args[0]) nb['nbr'].numero+=1;
        fs.writeFile("./Commandes/Admin/quizzMc/nbrQuizz.json", JSON.stringify(nb), (err) => {
            if(err) console.log(err);
        })

        const nbrR = question.choix.length;
        const good = question.reponse;
        const buttons = new MessageActionRow()

        for (let i=0; i < nbrR; i++) {
            buttons.addComponents(
                new MessageButton()
                    .setCustomId(reacNames[i])
                    .setLabel(`Réponse ${i+1}`)
                    .setEmoji(`${reac[i]}`)
                    .setStyle('PRIMARY'),
            );
        }

        let embed = new MessageEmbed()
            .setColor('#3498db')
            .setTitle('**QUESTION DU JOUR :**')
            .setDescription(`\`\`\`${question.question}\`\`\``)
            .setFooter({ text:`Vous avez 2 heures à partir de l'envoie de ce message pour répondre à ce QCM` })
            .setTimestamp(Date.now() + ms('2h'));

        for (i; i < nbrR; i++) {
            embed.addFields({ name: `Réponse ${reac[i]}`, value: `\`\`\`${question.choix[i]}\`\`\`` });
        }
		if(!args[0]) message.channel.send('<@&1191777800114421901>')
        let msg = await message.channel.send({ embeds: [embed], components: [buttons] })
        const filter = (button) => reacNames.includes(button.customId) && !button.user.bot;
        const collector = await msg.createMessageComponentCollector({ filter, componentType: "BUTTON", time: 1 * 60 * 1000 }); // 2 heures

        collector.on('collect', async (button) => {

            const user = button.user;
            const buttonId = button.customId;

            if (!previousAnswers[user.id]){
                previousAnswers[user.id] = buttonId;
            }
            else {
                const previousButtonId = previousAnswers[user.id];
                if (previousButtonId !== buttonId) {
                    winner.pop(user.username);
                    previousAnswers[user.id] = buttonId;
                } else return;
            }

            if (reacNames[parseInt(question["reponse"]) - 1] === buttonId) {
                if (!winner.includes(user.username)) {
                    let userData = await client.getUser(user);
                    userData = await client.updateXp(user, 8);
                    winner.push(user.username);

                    if (!cls[user.id]) {
                        cls[user.id] = {
                            win: 1
                        };
                    } else cls[user.id]["win"] += 1;

                    fs.writeFile("./Commandes/Admin/quizzMc/classement.json", JSON.stringify(cls), (err) => {
                        if (err) console.log(err);
                    });
                }
            }
        });

        collector.on('end', async (collected) => {
            let EmbedRep = new MessageEmbed()
                .setColor('GREEN')
                .setTitle('**Rappel de la question :**')
                .setDescription(`\`\`\`${question.question}\`\`\``)
                .addFields({ name: `La bonne réponse était ${reac[good - 1]}:`, value: `\`\`\`${question.choix[good - 1]} \n${question.text}\`\`\`` })
                .setFooter({ text:`Le QCM à eu ${Object.keys(previousAnswers).length} réponse(s)` })

            let winnersName = winner.map(username => `\`\`=>\`\` ${username}`).join('\n');

            if (winnersName.length === 0) {
                EmbedRep.addFields({ name: 'Aucune réponse correcte.', value: '\u200B' });
                EmbedRep.setColor('RED');
            } else {
                EmbedRep.addFields({ name: 'Ont répondu correctement :', value: `${winnersName}` });
            }

            msg.delete();
            await message.channel.send({ embeds: [EmbedRep] });
            console.log(`${collected.size} personnes ont répondu à la question`);
            winner = [];
        });   

        // Exécuter une fois immédiatement
        

    },
    options: [
        {
            name: 'message',
            description: 'Mettez la question à poser.',
            type: 'STRING',
            required: false
        }
    ],
    runSlash(client, interaction) {
        // Votre code pour l'interaction slash ici
    }
};
