const { Guild, User, Joueur } = require('../models');
const { MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');

module.exports = client => {
    //Guild
    client.getGuild = async guild => {
        const guildData = await Guild.findOne({ id: guild.id });
        return guildData;
    };

    client.createGuild = async guild => {
        const createGuild = new Guild({ id: guild.id, name: guild.name });
        createGuild.save().then(g => console.log(`Nouveau serveur (${g.id})`));
    };

    client.updateGuild = async (guild, settings) => {
        let guildData = await client.getGuild(guild);
        if(typeof guildData != 'object') guildData = {};
        for (const key in settings) {
            if (guildData[key] != settings[key]) guildData[key] = settings[key]
        }
        return guildData.updateOne(settings);
    }

    //User
    client.getUser = async user => {
        const userData = await User.findOne({ id: user.id });
        return userData;
    }

    client.createUser = async user => {
        const createUser = new User({ id: user.id, pseudo: user.username});
        createUser.save().then(u => console.log(`Nouveau utilisateur (${u.id})`))
    }

    client.updateUser = async (user, settings) => {
        try {
            let userData = await client.getUser(user);
            if (!userData || typeof userData !== 'object') userData = {};
            
            for (const key in settings) {
                if (userData[key] !== settings[key]) {
                    userData[key] = settings[key];
                }
                if (settings[key] === null) {
                    userData[key] = 0;
                }
            }

            const discordId = user.id;

            // Mise à jour de l'utilisateur par son identifiant Discord
            const userSettings = await User.findOneAndUpdate(
                { id: discordId },
                userData,
                { upsert: false, new: true } // Créer un nouvel utilisateur s'il n'existe pas
            );
            return userSettings;
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            throw error;
        }
    };

    client.getUserRank = async user => {
        // Récupère tous les utilisateurs depuis la base de données
        const allUsers = await User.find().sort({ lvl: -1, exp: -1 });
      
        // Récupère l'utilisateur en question
        const member = await User.findOne({ id: user.id });
      
        if (!member) {
          return 'Utilisateur non trouvé';
        }
      
        // Trouve l'index de l'utilisateur dans la liste triée
        const userIndex = allUsers.findIndex(u => u.id === user.id);
      
        // Renvoie le classement en ajoutant 1 car les index commencent à 0
        return userIndex + 1;
    }

    client.getClassement = async userData => {
        try {
            const emote = [
                "🥇",
                "🥈",
                "🥉",
                "<:quatre:1183121132652597309>",
                "<:cinq:1183121145352949786>",
                "<:six:1183121138260389940>",
                "<:sept:1183121143343886376>",
                "<:huit:1183121129561391104>",
                "<:neuf:1183121141708116118>",
                "<:dix:1183121147378794546>"
            ];
            const currentUser = await User.findOne({ id: userData.id });
            let classement = "";
            let rank = 0;

            if (!currentUser) classement = "Vous n'êtes pas classé, car vous n'avez jamais parlé."
            else {
                rank = await User.countDocuments({
                    $or: [
                        { lvl: { $gt: currentUser.lvl } },
                        { lvl: currentUser.lvl, exp: { $gt: currentUser.exp } }
                    ]
                });
            }

            const totalUsers = await User.countDocuments({});
            const limit = totalUsers < 10 ? totalUsers : 10;
            const topUsers = await User.find({})
              .sort({ lvl: -1, exp: -1 })
              .limit(limit);
        
            let embed = new MessageEmbed()
                .setTitle("Top 10 des membres du serveur :")
                .setFooter({ text: `Vous êtes top ${rank+1}.`, iconURL: userData.displayAvatarURL() });

            topUsers.forEach((user, index) => {
                embed.addFields({name: `${emote[index]} - ${user.pseudo}`, value: `\`\`=>\`\` Lvl: ${user.lvl} (${user.expTotal}xp)`})
            });
        
            return embed
        } catch (error) {
            return console.error('Erreur lors de la recherche des utilisateurs:', error);
        }
    }

    //Aventure
    client.getJoueur = async user => {
        const joueurData = await Joueur.findOne({ id: user.id });
        return joueurData;
    }

    client.createJoueur = async (user, settings) => {
        const createJoueur = new Joueur({ id: user.id, pseudo: user.username});
        createJoueur.save().then(u => console.log(`Nouveau joueur (${u.id})`))
    }

    client.updateJoueur = async (user, settings) => {
        const joueurData = await client.getJoueur(user);
        if(typeof joueurData != 'object') joueurData = {};
        for (const key in settings) {
            if (joueurData[key] != settings[key]) joueurData[key] = settings[key]
        }
        return joueurData.updateOne(settings);
    }
    
    client.getHead = async (nickname) => {
        return `https://minotar.net/avatar/${nickname}/32.png`;
    }
}