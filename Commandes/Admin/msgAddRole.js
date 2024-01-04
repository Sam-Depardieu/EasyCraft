const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('add-role')
            .setLabel('Notification')
            .setEmoji('🔰')
            .setStyle('SUCCESS'),
    )

module.exports = {
    name: 'msgaddrole',
    description: 'Commande add-role pour ajouter des rôles aux membres',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){
        let role = message.mentions.roles.first();
        
        const embed = new MessageEmbed()
            .setDescription(`Cliquez sur le button pour optenir le rôle **${role.name}** pour vous faire notifier à chaque nouvelles mentions`)
            
        const msg = await message.channel.send({embeds: [embed], components: [buttons]})

        const collector = msg.createMessageComponentCollector({ time:  180000});

        collector.on('collect', async interaction => {
            interaction.member.roles.add(role.id)
        })
    },
}