const { Client, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setCustomId('copier')
        .setLabel('Copier')
        .setStyle('PRIMARY'),
    );

module.exports = {
    name: 'test',
    description: 'Commande ping',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){
        const embed = new MessageEmbed()
            .setTitle('Galerie d\'images')
            .setDescription('Ceci est une galerie d\'images :')

        const images = [
            { name: 'Image 1', description: 'Description de l\'image 1', file: './img/2c.gif' },
            { name: 'Image 2', description: 'Description de l\'image 2', file: './img/2d.gif' },
            { name: 'Image 3', description: 'Description de l\'image 3', file: './img/2h.gif' }
        ];
        
        images.forEach(image => {
            embed.addFields({name: image.name, value: image.description, inline: true});
        });
        
        message.channel.send({ embeds: [embed], files: images.map(image => image.file) })    
        
    },
    runSlash(client, interaction) {

    }
};