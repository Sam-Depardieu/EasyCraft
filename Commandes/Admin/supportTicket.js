const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

const buttons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('support-button')
            .setLabel('Support')
            .setEmoji('☎️')
            .setStyle('SUCCESS'),
    )
module.exports = {
    name: 'support',
    description: 'Ticket de support',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){
        const embed = new MessageEmbed()
            .setTitle("**<:easycraft:1182620235279368223> Vous souhaitez faire une demande sur EasyCraft ?**")
            .setDescription("**<:moderator:1182621426872754217> Si vous avez des questions, des problèmes ou si vous avez besoin d'aide, n'hésitez pas à créer un ticket en cliquant sur le boutton ci-dessous.\nNotre équipe de support sera heureuse de vous aider dans les plus brefs délais !**")
            .setFooter({ text: 'Pour en faire une demande il suffit d\'ouvrir un ticket en cliquant sur les boutton ci-dessous', iconURL: message.guild.iconURL() })
        await message.channel.send({
            embeds: [embed],
            components: [buttons]
        })
    }
}