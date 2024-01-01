const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'morpion',
    description: 'Joue au morpion avec une autre personne (3min max).',
    permissions: ['SEND_MESSAGES'],
    usage: "@membre",
    require: true,
    async run(client, message, args){
        const ligne1 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('A')
                    .setLabel('A')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('B')
                    .setLabel('B')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('C')
                    .setLabel('C')
                    .setStyle('PRIMARY'),
            )
        const ligne2 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('D')
                    .setLabel('D')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('E')
                    .setLabel('E')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('F')
                    .setLabel('F')
                    .setStyle('PRIMARY'),
            )
        const ligne3 = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('G')
                    .setLabel('G')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('H')
                    .setLabel('H')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('I')
                    .setLabel('I')
                    .setStyle('PRIMARY'),
            )


        let joueur = 1;
        const joueur1 = message.author;
        const joueur2 = message.mentions.users.first();

        if(joueur1 === joueur2 || !joueur2) return message.channel.send("Ne jouez pas tout seul, c'est triste 😢")
        let game = true;

        const msg = await message.channel.send({content: `${joueur1.username} VS ${joueur2.username}`, components: [ligne1,ligne2,ligne3]})
        let components = ligne1.components.concat(ligne2.components, ligne3.components);
        let egality = false;

        const filter = interaction => ["A","B","C","D","E","F","G","H","I"].includes(interaction.customId) && game;
        const collector = msg.createMessageComponentCollector({ filter, time:  180000});

        if(joueur2 === client.user){
            return message.channel.send('ok')
        }
        else{
    
            collector.on('collect', async interaction => {
                components = ligne1.components.concat(ligne2.components, ligne3.components)
                if (interaction.user.id !== joueur1.id && interaction.user.id !== joueur2.id) return message.reply({ content: "Vous n'êtes pas invité à jouer.", ephemeral: true });
                if ((interaction.user.id === joueur1.id && joueur === 0) || (interaction.user.id === joueur2.id && joueur === 1)) return message.reply({ content: "Ce n'est pas à vous de jouer.", ephemeral: true });
                const choice = interaction.customId;
                let currentButton = 0;
    
                switch(choice)
                {
                    case 'A':
                        currentButton = ligne1.components[0];
                        break;
                    case 'B':
                        currentButton = ligne1.components[1];
                        break;
                    case 'C':
                        currentButton = ligne1.components[2];
                        break;
                    case 'D':
                        currentButton = ligne2.components[0];
                        break;
                    case 'E':
                        currentButton = ligne2.components[1];
                        break;
                    case 'F':
                        currentButton = ligne2.components[2];
                        break;
                    case 'G':
                        currentButton = ligne3.components[0];
                        break;
                    case 'H':
                        currentButton = ligne3.components[1];
                        break;
                    case 'I':
                        currentButton = ligne3.components[2];
                        break;
    
                }
                currentButton.setCustomId((joueur ? "rond"+currentButton.customId : "croix"+currentButton.customId)).setLabel((joueur ? "O" : "X")).setStyle((joueur ? "SUCCESS" : "DANGER")).setDisabled()
                msg.edit({ components: [ligne1, ligne2, ligne3] }).catch(console.error);
                if((ligne1.components[0].label === ligne2.components[0].label && ligne1.components[0].label === ligne3.components[0].label) || 
                    (ligne1.components[1].label === ligne2.components[1].label && ligne1.components[1].label === ligne3.components[1].label) ||
                    (ligne1.components[2].label === ligne2.components[2].label && ligne1.components[2].label === ligne3.components[2].label) ||
                    (ligne1.components[0].label === ligne1.components[1].label && ligne1.components[2].label === ligne1.components[0].label) ||
                    (ligne2.components[0].label === ligne2.components[1].label && ligne2.components[0].label === ligne2.components[2].label) || 
                    (ligne3.components[0].label === ligne3.components[1].label && ligne3.components[0].label === ligne3.components[2].label) || 
                    (ligne1.components[0].label === ligne2.components[1].label && ligne1.components[0].label === ligne3.components[2].label) ||
                    (ligne1.components[2].label === ligne2.components[1].label && ligne1.components[2].label === ligne3.components[0].label))
                {
                    game = false
                    return collector.stop()
                }
                if(components.every(button => button.disabled))
                { 
                    collector.stop();
                    egality = true;
                }
                joueur = (joueur===1 ? 0 : 1);
            })
        }

        collector.on("end", async interaction => {
            components.forEach(button => {
                button.setDisabled(true);
            });
            if(egality) return msg.edit({content: "Cette partie se fini sur une égalité!", components: [ligne1, ligne2, ligne3] })
            if(!game) return msg.edit({content: (joueur ? joueur1.username:joueur2.username)+" a gagné cette partie!", components: [ligne1, ligne2, ligne3] })
            return msg.edit({content: "La partie n'a pas été finie à temps.", components: [ligne1, ligne2, ligne3] })
        })
    },
    async runSlash(client, interaction) {
        interaction.reply({content:"Jeu pas disponible avec une commande slash", ephemeral: true})
    }
}