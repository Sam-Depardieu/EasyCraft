const { MessageEmbed } = require("discord.js");
const tool = require('./outil.json')

module.exports = {
    name: 'start',
    description: 'Commande start aventure',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){
        const joueurSettings = client.getJoueur(message.author);

        const embed = new MessageEmbed()
            .setTitle(`Bienvenue à toi ${message.author.username}`)
            .addFields(
                { name: "ok", value: "ok" },
                { name: "ok", value: "ok" }
            )
    },
    runSlash: (client, interaction) => {
        
    }
};