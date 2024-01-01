const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const nbrticket = require('../../ticket.json');
const fs = require('fs');

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('del-ticket')
            .setLabel('Fermer le ticket')
            .setEmoji('🚫')
            .setStyle('DANGER'),
    )

module.exports = {
    name: 'support-button',
    async runSlash(client, interaction) {
        
        const guild = interaction.guild;
        const category = interaction.guild.channels.cache.get(client.getGuild(interaction.guild).categoryTicket)
        
        const channel = await guild.channels.create(`ticket support ${nbrticket["ticket"].nbrticket}`, {
            type: 'GUILD_TEXT',
            parent: category,
            topic: `${interaction.user.username}`,
        }); 
        await channel.permissionOverwrites.edit(interaction.user.id, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true
        });
        nbrticket["ticket"].nbrticket = nbrticket["ticket"].nbrticket +++ 1
        fs.writeFile("./ticket.json", JSON.stringify(nbrticket), (err) => {
            if(err) console.log(err);
        });

        const embed = new MessageEmbed()
            .setTitle(`<:goat:1182394839548035092> Bonjour/bonsoir ${interaction.user.username}, merci de patienter un staff arrive dans les plus brefs délais !`)
            .setFooter({ text: 'EASYCRAFT | Votre serveur communauté Minecraft', iconURL: interaction.guild.iconURL() })

        channel.send({
            embeds: [embed],
            components: [buttons]
        })
        await interaction.reply({ content: 'Votre ticket à bien été créé !', ephemeral: true});
        
    }
};