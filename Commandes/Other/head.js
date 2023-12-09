const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'head',
    description: 'tête de joueur',
    permissions: ['SEND_MESSAGES'],
    async run(client, message, args){

        var nickname = message.member.nickname;
        if (args[0])
        {
            nickname = args[0];
        }
        if (!isNaN(args[0]))
        {
            let user = await client.users.fetch(args[0])
            if(!user) message.channel.send("L'utilisateur n'existe pas.")
            nickname = message.guild.members.cache.get(args[0]).nickname;
        }
        message.channel.send(`https://minotar.net/avatar/${nickname}/32.png`);
    },
    options: [
        {
            name: 'pseudo',
            description: 'Mettez le pseudo du joueur à qui vous voulez récupérer la tête.',
            type: 'STRING',
            required: true
        }
    ],
    async runSlash(client, interaction) {
        var text = interaction.options.getString("pseudo");
        
        interaction.reply(`https://minotar.net/avatar/${text}/32.png`)
    }
}