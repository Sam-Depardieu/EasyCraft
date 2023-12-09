const { MessageAttachment, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'guildMemberAdd',
    once: 'false',
    async execute(client, member) {
        console.log(`Nouveau membre (${member.id})`)
        
        member.roles.add('1174789067884478515')
        member.send(`Bienvenue sur notre serveur Discord d'EasyCraft ! \n\n👋 Salut ${member} ! Nous sommes ravis de t'accueillir parmi nous. Que tu sois un constructeur expérimenté ou un aventurier débutant, tu es au bon endroit pour partager ta passion pour Minecraft. \n\n🌟 Prends le temps de parcourir les différents salons, pose des questions si besoin. \n\n🔧 Si tu as des questions ou besoin d'aide, notre équipe est là pour t'assister. N'oublie pas de consulter les règles du serveur pour une expérience optimale. \n\n🎉 Nous espérons que tu te sentiras chez toi ici et que tu profiteras pleinement de cette aventure Minecraft avec nous ! \n\nN'hésite pas à nous faire savoir si tu as des questions ou des besoins particuliers. Bienvenue encore une fois ! 🌟`)

        const embed = new MessageEmbed()
            .setTitle("Bienvenue sur le serveur EasyCraft")
            .setURL('https://www.tiktok.com/@easycraft_mc')
            .setColor('RANDOM')
            .setThumbnail(`https://cdn.discordapp.com/attachments/1178396940266913862/1181958240481845328/ciel.png?ex=6582f364&is=65707e64&hm=48feec6a11be4c70254211ec6b910b13a3bd02a1fac7858c72d9f7b55143b6c9&`)
            .setDescription(`● Bienvenue à ${member} sur le serveur d'EasyCraft. Tu es le ${member.guild.memberCount}ème membre du serveur! `)
            .setFooter({text: `N\'hésite pas à aller lire le réglement.`, iconURL: client.user.displayAvatarURL()})


        member.guild.channels.cache.get('1178306392176730193').send({ embeds: [embed] })
    },

};