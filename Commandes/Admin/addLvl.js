module.exports = {
    name: 'add-lvl',
    description: 'Ajout des niveaux à la personne de son choix.',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){
        const lvlToAdd = parseInt(args[0]); // Récupération de la quantité de niveau à ajouter
        const member = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.tag === args[1]);

        if (!member) {
            return message.channel.send(`Membre non trouvé.`);
        }
        const memberSettings = await client.getUser(member); // Récupération des données de l'utilisateur
        if(!memberSettings) {
            return message.channel.send(`Le membre ${member.user.username} n'est pas renseigné dans la base de données.`);
        }

        let level = memberSettings.lvl;
        let lvlNow = level + lvlToAdd;
        let nextLevel = 0;
        if(lvlNow <= 15) nextLevel = 2 * (lvlNow + 1) + 14;
        else if(lvlNow <= 30) nextLevel = 5 * lvlNow - 19;
        else if(lvlNow > 30) nextLevel = 9 * lvlNow - 79;
        
        await client.updateUser(member, { lvl: lvlNow, expTotal: nextLevel });

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