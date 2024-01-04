const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const ms = require('ms');
const cg = require('./cg/question.json');
const cls = require('./cg/classement.json')
const nb = require('./cg/nbrQ.json')
const fs = require('fs')

module.exports = {
    name: 'cg',
    description: 'question de culture g',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args) {
        message.delete()

        // Définir les heures de début et de fin (9h et 21h)
        const startHour = 0;
        const endHour = 59;

        // Boucle pour planifier la tâche toutes les heures
        const executeOnce = async () => {
            const nbrQ = Object.keys(cg).length;
            const currentDate = new Date();
            const currentMinute = currentDate.getMinutes();
            let randomQ = nb['nbr'].numero

            // Vérifier si le temps actuel est entre la 30e et la 40e minute
            if (currentMinute >= startHour && currentMinute < endHour) {
                if(randomQ <= nbrQ){
                    const reac = ["<:lettreA:1184941756647751710>", "<:lettreB:1184941752793169931>", "<:lettreC:1184941748607262842>", "<:lettreD:1184941743276310709>"];
                    const reacNames = ["lettreA", "lettreB", "lettreC", "lettreD"]; 
                    
                    const previousAnswers = {};
                    let winner = [];
                    let i = 0;
                    const question = cg[randomQ];

                    nb['nbr'].numero+=1;
                    fs.writeFile("./Commandes/admin/cg/nbrQ.json", JSON.stringify(nb), (err) => {
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
                        .setTimestamp(Date.now() + ms('30m'));
    
                    for (i; i < nbrR; i++) {
                        embed.addFields({ name: `Réponse ${reac[i]}`, value: `\`\`\`${question.choix[i]}\`\`\`` });
                    }
    
                    let msg = await message.channel.send({ embeds: [embed], components: [buttons] })
                    const filter = (button) => reacNames.includes(button.customId) && !button.user.bot;
                    const collector = await msg.createMessageComponentCollector({ filter, componentType: "BUTTON", time: 1* 60 * 1000 }); // 1 minute
    
                    collector.on('collect', async (button) => {

                        const user = button.user;
                        const buttonId = button.customId;

                        if (!previousAnswers[user.id]) {
                            previousAnswers[user.id] = buttonId;
                        } else {
                            const previousButtonId = previousAnswers[user.id];
                            if (previousButtonId !== buttonId) {
                                // Si l'utilisateur change de réponse, mettez à jour
                                winner.pop(user.username);
                                previousAnswers[user.id] = buttonId;
                            } else {
                                // Si l'utilisateur appuie sur le même bouton, ne rien faire ou gérer comme vous le souhaitez
                                // Ici, je ne fais rien pour ignorer la deuxième pression du même bouton
                                return;
                            }
                        }
    
                        if (previousAnswers[user.id] >= 1) previousAnswers[user.id]++;
                        else{
                            previousAnswers[user.id]++;
                            if(reacNames[parseInt(question["reponse"])-1] === buttonId) {
                                winner.push(user.username);
                                if (!cls[user.id]) {
                                    cls[user.id] = {
                                        win : 1
                                        
                                    }
                                    fs.writeFile("./Commandes/admin/cg/classement.json", JSON.stringify(cls), (err) => {
                                        if(err) console.log(err);
                                    })
                                }
                                else
                                {
                                    cls[user.id]["win"]+=1;
                                    fs.writeFile("./Commandes/admin/cg/classement.json", JSON.stringify(cls), (err) => {
                                        if(err) console.log(err);
                                    })
                                }
                            } 
                            previousAnswers[user.id] = 1;
                            console.log(`${user.tag} a réagi`);
                        }
                    });
    
                    collector.on('end', async (collected) => {
                        let EmbedRep = new MessageEmbed()
                            .setColor('GREEN')
                            .setTitle('**Rappel de la question :**')
                            .setDescription(`\`\`\`${question.question}\`\`\``)
                            .addFields({ name: `La bonne réponse était ${reac[good - 1]}:`, value: `\`\`\`${question.choix[good - 1]}\`\`\`` })
                            .setFooter({ text:`Le QCM à eu ${Object.keys(previousAnswers).length} réponse(s)` })
    
                        let winnersName = winner.map(username => `\`\`=>\`\` ${username}`).join('\n');
                        if (winnersName.length  === 0) {
                            EmbedRep.addFields({ name: 'Aucune réponse correcte.', value: '\u200B' });
                            EmbedRep.setColor('RED')
                        } else EmbedRep.addFields({ name: 'Ont répondu correctement :', value: `${winnersName}` });
    
                        msg.delete();
                        await message.channel.send({ embeds: [EmbedRep] });
                        console.log(`${collected.size} personnes ont répondu à la question`);
                        winner = [];
                    });
                    
                }else message.channel.send("Plus de questions disponible, à bientôt !")
            }

            setTimeout(() => {
                executeOnce(); // Exécution répétée après une heure
            },  60 * 1000); //Toutes les heures
        }; 

        // Exécuter une fois immédiatement
        executeOnce();

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
