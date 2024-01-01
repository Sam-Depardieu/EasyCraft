const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
let cooldown = new Set();
const nbrticket = require('../../nbrGagnant.json');
const fs = require('fs');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('check')
        .setLabel('Validé')
        .setStyle('PRIMARY')
        .setEmoji('✅')
    )

module.exports = {
    name: 'loto',
    description: "Joue à une machine à sous.",
    permissions: ['SEND_MESSAGES'],
    async run(client, message){
        const num1 = 6;
        const num2 = 6;
        
        if(cooldown.has(message.author.id)){
            message.delete(message.author);
            const msg = await message.channel.send(`Tu dois encore attendre ${Math.round((3600000 - cooldown.has(message.author.id)) / 60000)}min pour faire cette commande`).then(
            setTimeout(() => {
                msg.delete();
            }, 3600))
        
        }else{
            cooldown.add(message.author.id)
            setTimeout(() => cooldown.delete(message.author.id), 60000)

            const messageBase = `:moneybag:** Loto Mini-Jeux **:moneybag: \n\n **➜ Lancement du premier numéro... \n ➜ Lancement du second numéro...** \n \n Que la chance soit avec toi ${message.author} ! <:MiniJeux_MJ:853036290261778443>`;
            const message2 = `:moneybag:** Loto Mini-Jeux **:moneybag: \n\n **➜ Votre premier numéro est : \`\`${num1}\`\` \n ➜ Lancement du second numéro...** \n \n Que la chance soit avec toi ${message.author} ! <:MiniJeux_MJ:853036290261778443>`;
            const message3 = `:moneybag:** Loto Mini-Jeux **:moneybag: \n\n **➜ Votre premier numéro est : \`\`${num1}\`\` \n ➜ Votre second numéro est : \`\`${num2}\`\`** \n \n Que la chance soit avec toi ${message.author} ! <:MiniJeux_MJ:853036290261778443>`;

            const msg = await message.channel.send(messageBase);
            setTimeout(()  => {
                msg.edit(message2);
            }, 1800);
            setTimeout(() => {
                msg.edit(message3);
            }, 3600);

            if(num1 === num2){
                const nombreWin = nbrticket["gagnant"].nbr+1
                nbrticket["gagnant"].nbr = nombreWin
                fs.writeFile("./nbrGagnant.json", JSON.stringify(nbrticket), (err) => {
                    if(err) console.log(err);
                });
                const channel = message.guild.channels.cache.find(ch => ch.id === `1183790287533908058`);

                const message4 = `:moneybag:** Loto Mini-Jeux **:moneybag: \n\n **➜ Votre premier numéro est : \`\`${num1}\`\` \n ➜ Votre second numéro est : \`\`${num2}\`\`** \n \n Félicitation ${message.author}, vous avez gagné ${num1*1000}! Vous allez bientôt recevoir votre argent. <:MiniJeux_MJ:853036290261778443>`;

                setTimeout(() => {
                    msg.edit(message4);
                }, 5400);
                setTimeout(async () => {
                    const embed = new MessageEmbed()
                        .setAuthor({name: "Nouveau gagnant :", iconURL: message.author.displayAvatarURL()})
                        .setColor("GOLD")
                        .setDescription(`Member : <@${message.author.id}> \nId : ${message.author.id}\nSomme gagné: ${num1*1000}\nGagnant numéro : ${nbrticket["gagnant"].nbr}`)
                        .setFooter({text: `La commande est : \$add-money bank <@${message.author.id}> ${num1*1000}`})
                        .setTimestamp()

                    const msg = await channel.send({ embeds: [embed], components: [row] })
                    channel.send(`\`\`\$add-money bank <@${message.author.id}> ${num1*1000}\`\``)
                    const filter = interaction => interaction.customId === 'check' && interaction.member.permissions.has(['ADMINISTRATOR']);
                    const collector = msg.createMessageComponentCollector({ filter });

                    collector.on('collect', async interaction => {
                        message.author.send(`Votre argent à bien été versé sur votre compte`); // Ici, vous pouvez modifier le contenu que vous souhaitez copier
                        msg.edit({ components: [] }).catch(console.error);
                        collector.stop();
                    });                    
                }, 7200);
            }else{
                const message4 = `:moneybag:** Loto Mini-Jeux **:moneybag: \n\n **➜ Votre premier numéro est : \`\`${num1}\`\` \n ➜ Votre second numéro est : \`\`${num2}\`\`** \n \n Quel dommage ${message.author.username}, vous avez perdu... <:MiniJeux_MJ:853036290261778443>`;
                setTimeout(() => {
                    msg.edit(message4);
                }, 5400);
            
            }
        }
    }
}