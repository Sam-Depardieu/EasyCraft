const { MessageAttachment, MessageEmbed } = require("discord.js");
const Canvacord = require('canvacord');

module.exports = {
    name: 'level',
    description: 'Commande ping',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){
        let user = await client.getUser(message.author)
        let userCls = await client.getUserRank(message.author)
        let NowLevel = user.lvl || 0;

        if(NowLevel<=15) {nextLevel = 2*(NowLevel+1)+14}
        else if(NowLevel<=30) {nextLevel = 5*NowLevel-19}
        else if(NowLevel>30) {nextLevel = 9*NowLevel-79}

        else { await client.updateUser(message.author, {nextExpReq: nextLevel}) }

        const levelImage = new Canvacord.Rank()
            .setAvatar(message.author.displayAvatarURL({ format: 'png' }))
            .setCurrentXP(user.exp) // Utilise l'expérience de l'utilisateur pour représenter le niveau
            .setRequiredXP(user.nextExpReq)
            .setLevel(user.lvl) // Utilise le niveau de l'utilisateur
            .setRank(userCls)
            .setProgressBar('#FFA500', 'COLOR')
            .setUsername(message.author.username)
            .setDiscriminator(user.pseudo)
            .setBackground('IMAGE', 'https://media.discordapp.net/attachments/1092086831077658755/1182417948447612928/ciel.png?ex=65849f87&is=65722a87&hm=7bfb1b921a5c0e2556a9589b4aa0a3de161819058fa219db9a2cbc3675a62ea0&=&format=webp&quality=lossless&width=1440&height=532'); // Ajoute un arrière-plan (remplace l'URL DE L'IMAGE par l'URL de ton image Canva)
        
        /*member.guild.channels.cache.get('1178306392176730193').send();*/
        if (message.author.banner) {
            rank.setBackground(
              'IMAGE',
              `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`
            );
        }
        const rankCard = await levelImage.build();
    
        // Envoie l'image dans le canal Discord
        message.channel.send({ files : [new MessageAttachment(rankCard, 'rank.png')]});
    },
    async runSlash(client, interaction){
        let user = await client.getUser(interaction.user)
        let userCls = await client.getUserRank(interaction.user)
        const levelImage = new Canvacord.Rank()
            .setAvatar(interaction.user.displayAvatarURL({ format: 'png' }))
            .setCurrentXP(user.exp) // Utilise l'expérience de l'utilisateur pour représenter le niveau
            .setRequiredXP(user.nextExpReq)
            .setLevel(user.lvl) // Utilise le niveau de l'utilisateur
            .setRank(userCls)
            .setProgressBar('#FFA500', 'COLOR')
            .setUsername(interaction.user.username)
            .setDiscriminator(user.pseudo)
            .setBackground('IMAGE', 'https://media.discordapp.net/attachments/1092086831077658755/1182417948447612928/ciel.png?ex=65849f87&is=65722a87&hm=7bfb1b921a5c0e2556a9589b4aa0a3de161819058fa219db9a2cbc3675a62ea0&=&format=webp&quality=lossless&width=1440&height=532'); // Ajoute un arrière-plan (remplace l'URL DE L'IMAGE par l'URL de ton image Canva)
        
        /*member.guild.channels.cache.get('1178306392176730193').send();*/
        if (interaction.user.banner) {
            rank.setBackground(
              'IMAGE',
              `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png`
            );
        }

        const rankCard = await levelImage.build();
    
        // Envoie l'image dans le canal Discord
        interaction.reply({ files : [new MessageAttachment(rankCard, 'rank.png')]});
    }
};