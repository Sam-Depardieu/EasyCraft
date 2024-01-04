module.exports = {
    name: 'add-xp',
    description: 'Ajout d\'expérience à la personne de son choix',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){
        const xpToAdd = parseInt(args[0]); // Récupération de la quantité d'expérience à ajouter
        const member = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.tag === args[1]);
        
        if (!member) {
            return message.channel.send(`Membre non trouvé.`);
        }

        const memberSettings = await client.getUser(member); // Récupération des données de l'utilisateur
        if(!memberSettings) {
            return message.channel.send(`Le membre ${member.user.username} n'est pas renseigné dans la base de données.`);
        }
        let level = memberSettings.lvl;
        memberSettings = await client.updateXp(member, xpToAdd);

        message.channel.send(`Ajout de ${xpToAdd} points d'expérience à ${member.user.username}.`);
        if (level > memberSettings.lvl) {
            message.channel.send(`${member.user.username} a atteint le niveau ${level} !`);
        }
    },
    options: [
        {
            name: 'message',
            description: 'Mettez le message à envoyer.',
            type: 'STRING',
            required: false
        }
    ],
    runSlash(client, interaction) {

    }
}