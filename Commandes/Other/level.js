const { MessageAttachment } = require("discord.js");
const Canvacord = require('canvacord');

module.exports = {
    name: 'level',
    description: ' Affiche le niveau d\'xp et le rang de la personne mentionnée ou vous.',
    permissions: ['SEND_MESSAGES'],
    usage: '@member',
    require: false,
    async run(client, message, args){
        let user, userData, userCls;
        if(args[0])
        {
            user = message.mentions.members.first().user;
            userData = await client.getUser(user);
            userCls = await client.getUserRank(user);
        }
        else{
            user = message.author;
            userData = await client.getUser(user);
            userCls = await client.getUserRank(user);
        }
        let NowLevel = user.lvl || 0;

        if(NowLevel<=15) nextLevel = 2*(NowLevel+1)+14
        else if(NowLevel<=30) nextLevel = 5*NowLevel-19
        else if(NowLevel>30) nextLevel = 9*NowLevel-79

        else await client.updateUser(message.author, {nextExpReq: nextLevel})

        const levelImage = new Canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setCurrentXP(userData.exp) // Utilise l'expérience de l'utilisateur pour représenter le niveau
            .setRequiredXP(userData.nextExpReq)
            .setLevel(userData.lvl) // Utilise le niveau de l'utilisateur
            .setRank(userCls)
            .setProgressBar('#FFA500', 'COLOR')
            .setUsername(user.username)
            .setDiscriminator(userData.pseudo)
            .setBackground('IMAGE', 'https://media.discordapp.net/attachments/1092086831077658755/1182417948447612928/ciel.png?ex=65849f87&is=65722a87&hm=7bfb1b921a5c0e2556a9589b4aa0a3de161819058fa219db9a2cbc3675a62ea0&=&format=webp&quality=lossless&width=1440&height=532'); // Ajoute un arrière-plan (remplace l'URL DE L'IMAGE par l'URL de ton image Canva)
        
        /*member.guild.channels.cache.get('1178306392176730193').send();*/
        if (user.banner) {
            rank.setBackground(
              'IMAGE',
              `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`
            );
        }
        const rankCard = await levelImage.build();
    
        // Envoie l'image dans le canal Discord
        message.channel.send({ files : [new MessageAttachment(rankCard, 'rank.png')]});
    },
    options: [
        {
            name: 'membre',
            description: 'Mentionnez ou indiqué le pseudo d\'une personne, aucun si vous voulez connaître votre niveau.',
            type: 'USER',
            required: false
        }
    ],
    async runSlash(client, interaction){
        let user, userData, userCls;
        const memberOption = interaction.options.getUser("membre");

        if (memberOption) {
            const memberUser = memberOption;
            user = interaction.options.getUser("membre");
            userCls = await client.getUserRank(memberUser);
            userData = await client.getUser(interaction.options.getUser("membre"))
            
        }
        if (!user){ 
            userCls = await client.getUserRank(interaction.user);
            user = interaction.user;
            userData = await client.getUser(interaction.user);
        }
        
        const levelImage = new Canvacord.Rank()
            .setAvatar(user.displayAvatarURL({ format: 'png' }))
            .setCurrentXP(userData.exp) // Utilise l'expérience de l'utilisateur pour représenter le niveau
            .setRequiredXP(userData.nextExpReq)
            .setLevel(userData.lvl) // Utilise le niveau de l'utilisateur
            .setRank(userCls)
            .setProgressBar('#FFA500', 'COLOR')
            .setUsername(user.username)
            .setDiscriminator(userData.pseudo)
            .setBackground('IMAGE', 'https://media.discordapp.net/attachments/1092086831077658755/1182417948447612928/ciel.png?ex=65849f87&is=65722a87&hm=7bfb1b921a5c0e2556a9589b4aa0a3de161819058fa219db9a2cbc3675a62ea0&=&format=webp&quality=lossless&width=1440&height=532'); // Ajoute un arrière-plan (remplace l'URL DE L'IMAGE par l'URL de ton image Canva)
        
        /*member.guild.channels.cache.get('1178306392176730193').send();*/
        if (user.banner) {
            rank.setBackground(
              'IMAGE',
              `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`
            );
        }

        const rankCard = await levelImage.build();
    
        // Envoie l'image dans le canal Discord
        try{
            await interaction.deferReply();
            
            await interaction.editReply({ files : [new MessageAttachment(rankCard, 'rank.png')]});
        }catch(err)
        {
            const guildSettings = await client.getGuild(interaction.member.guild);
            interaction.user.send(`Erreur lors de la génération de votre image level, essayez la commande ${guildSettings.prefix}level`)
        }
    }
};