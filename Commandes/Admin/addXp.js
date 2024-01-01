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

        let xpNow = memberSettings.exp + xpToAdd; // Calcul de la nouvelle quantité d'expérience

        let nextLevel = 0;
        let level = memberSettings.lvl;

        while (xpNow >= memberSettings.nextExpReq) {
            level++;
            xpNow -= memberSettings.nextExpReq;
            if(level <= 15) nextLevel = 2 * (level + 1) + 14;
            else if(level <= 30) nextLevel = 5 * level - 19;
            else if(level > 30) nextLevel = 9 * level - 79;
        }

        // Mise à jour des données de l'utilisateur avec le nouveau niveau et l'expérience
        await client.updateUser(member, { lvl: level, exp: xpNow, expTotal: memberSettings.expTotal + xpToAdd });

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