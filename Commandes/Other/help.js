const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Je pense que vous savez à quoi ça sert.',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){
        const data=[]
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des commandes')
            .setDescription('Voici la liste de toutes les commandes disponibles pour votre bot')
            .setFooter({ text: "Bot créé par samdepardieu", iconURL: message.author.displayAvatarURL() });

        (await pGlob(`${process.cwd()}/Commandes/Other/*.js`)).map(async cmdFile => {
            const cmd = require(cmdFile);
            const argument = cmd.usage ? "<"+cmd.usage+"> ("+ (cmd.require?"obligatoire":"optionnel")+")" : ""
            data.push(`**${cmd.name.toString()}** ${argument} : \n \t\`\`=>\`\` __${cmd.description.toString()}__`) 
        });
        embed.setDescription(data.join('\n'));
        message.channel.send({ embeds: [embed] });
    },
    async runSlash(client, interaction) {
		const data=[]
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Liste des commandes')
            .setDescription('Voici la liste de toutes les commandes disponibles pour votre bot')
            .setFooter({ text: "Bot créé par samdepardieu", iconURL: interaction.user.displayAvatarURL() });

        (await pGlob(`${process.cwd()}/Commandes/Other/*.js`)).map(async cmdFile => {
            const cmd = require(cmdFile);
            const argument = cmd.usage ? "<"+cmd.usage+"> ("+ (cmd.require?"obligatoire":"optionnel")+")" : ""
            data.push(`**${cmd.name.toString()}** ${argument} : \n\`\`=>\`\` __${cmd.description.toString()}__`) 
        });
        embed.setDescription(data.join('\n'));
        interaction.reply({ embeds: [embed] });
    }
};