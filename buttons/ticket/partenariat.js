const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const nbrticket = require('../../ticket.json');
const fs = require('fs');

module.exports = {
    name: 'part-button',
    async runSlash(client, interaction) {
        
        const guild = interaction.guild;
        const category = interaction.guild.channels.cache.get("1086344523526967496")
        
        const channel = await guild.channels.create(`ticket partenariat ${nbrticket["ticket"].nbrticket}`, {
            type: 'GUILD_TEXT',
            parent: category,
            topic: `${interaction.user.username}`
        }); 
        channel.permissionOverwrites.edit(interaction.user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true
        });
        nbrticket["ticket"].nbrticket = nbrticket["ticket"].nbrticket +++ 1
        fs.writeFile("./ticket.json", JSON.stringify(nbrticket), (err) => {
            if(err) console.log(err);
        });

        const embed = new MessageEmbed()
            .setTitle(`<:7504ankhasip:1086047445714219008> Bonjour/bonsoir ${interaction.user.username}, merci de patienter un staff arrive dans les plus brefs délais !`)
            .setFooter({ text: 'HERO PUB | Votre serveur publicitaire.', iconURL: interaction.guild.iconURL() })

        channel.send({
            embeds: [embed]
        })
        await interaction.reply({ content: 'Votre ticket à bien été créé !', ephemeral: true});
        
    }
};