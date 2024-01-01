module.exports = {
    name: 'config',
    description: 'Choisissez un element à configurer',
    permissions: ['ADMINISTRATOR'],
    usage: "element + option",
    require: true,
    async run(client, message, args){
        if (!args[0] || !args[0].match(/^(logChannel|welcomeChannel|roleNewMember|prefix|ideaChannel|boostXp|categoryTicket)$/)) return message.reply('Merci d\'entrer une configuration valide (\ logChannel\`/\`welcomeChannel\`/\`roleNewMember\`/\`prefix\`/\`ideaChannelID)');

        const guildSettings = await client.getGuild(message.guild);
        if (args[0] == "logChannel")
        {
            const logChannel = await message.guild.channels.cache.get(args[1]);

            if(!logChannel) return message.channel.send("Salon inexistant sur ce serveur!");
            if(isNaN(args[0])) return message.channel.send("Merci d'indiquer l'ID du salon");
            
            if(guildSettings.logChannelID != '0') message.channel.send(`Le channel de log est passé de ${message.guild.channels.cache.get(guildSettings.logChannelID)} à ${logChannel}`)
            else message.channel.send(`Le channel de log est maintenant ${logChannel}`)

            await client.updateGuild(message.guild, {logChannelID: args[1]})
        }else if(args[0] == "welcomeChannel")
        {
            if(isNaN(args[0])) return message.channel.send("Veuillez indiquer l'ID du salon en second argument.");
            const welcomeChannel = await message.guild.channels.cache.get(args[1]);

            if(!welcomeChannel) return message.channel.send("Salon inexistant sur ce serveur!");

            if(guildSettings.welcomeChannelID != '0') message.channel.send(`Le channel d'accueil est passé de ${message.guild.channels.cache.get(guildSettings.welcomeChannelID)} à ${welcomeChannel}.`)
            else message.channel.send(`Le channel de log est maintenant ${welcomeChannel}.`)

            await client.updateGuild(message.guild, {welcomeChannelID: args[1]})
        }else if(args[0] == "roleNewMember")
        {
            const role = message.mentions.roles.first();

            if(!role) return message.channel.send("Merci de mentionner un rôle en second argument.");
            message.guild.roles.cache.find((r) => r.name == args[1])

            if(guildSettings.nwMemberRoleID != '0') message.channel.send(`Le rôle des nouveaux membres est passé de ${message.guild.roles.cache.find((r) => r.id == guildSettings.nwMemberRoleID)} à ${role}.`);
            else message.channel.send(`Le rôle de bienvenue est maintenant ${role}.`)

            await client.updateGuild(message.guild, {nwMemberRoleID: role.id})
        }else if(args[0] == "prefix")
        {
            const prefix = args[1];

            if(!prefix) return message.channel.send("Merci d'indiquer un préfix à configurer.");

            if(guildSettings.prefix) message.channel.send(`Nouveau préfix : \`\`${guildSettings.prefix}\`\` => \`\`${prefix}\`\``);
            else message.channel.send(`Nouveau préfix : \`\`${prefix}\`\``)

            await client.updateGuild(message.guild, {prefix: prefix})
        }else if(args[0] == "ideaChannel"){
            if(isNaN(args[1])) return message.channel.send("Veuillez indiquer l'ID du salon en second argument.")
            const channel = await message.guild.channels.cache.get(args[1]);
            
            if(!channel) return message.channel.send("Salon inexistant sur ce serveur.")

            if(guildSettings.ideaChannelID != '0') message.channel.send(`Le channel d'idée est passé de ${message.guild.channels.cache.get(guildSettings.ideaChannelID)} à ${channel}.`)
            else message.channel.send(`Le channel d'idée est maintenant ${channel}.`);

            await client.updateGuild(message.guild,{ideaChannelID: channel.id})
        }else if(args[0] == "boostXp"){
            if(!isNaN(args[1])) return message.channel.send("Merci d'indiquer un chiffre pour initialiser un boost d'xp");
            
            try{
                await client.updateGuild(message.guild,{boostXp: args[1]})
                message.channel.send(`L'XP gagné est maintenant multiplié par ${args[1]}`)
            }catch (err)
            {
                message.channel.send("Une erreur s'est glissé dans le code, retentez ou contactez le dev.")
            }
        }else if(args[0] == "categoryTicket"){
            if(isNaN(args[1])) return message.channel.send("Veuillez indiquer l'ID du salon en second argument.")
            const category = await message.guild.channels.cache.get(args[1]);
            
            if(!category) return message.channel.send("Catégorie inexistante sur ce serveur.")
            if(category.type == "category") return message.channel.send("Cet ID n'est pas un ID de catégorie.")

            if(guildSettings.categoryTicket != '0') message.channel.send(`La catégorie de ticket est passé de ${message.guild.channels.cache.get(guildSettings.categoryTicket).name} à ${category.name}.`)
            else message.channel.send(`La catégorie de ticket est maintenant ${category.name}`)

            await client.updateGuild(message.guild,{categoryTicket: category.id})
        }

    },
    options: [
        {
            name: 'element',
            description: 'Choisissez un element à configurer',
            type: 'STRING',
            required: true,
            choices: [
                {

                    name: 'prefix',
                    value: 'prefix',
                },
                {
                    name: 'Salon de Bienvenue',
                    value: 'welcomeChannel',
                    
                },
                {
                    name: 'Role de nouveau Membre',
                    value: 'nwMemberRole',
                    
                }
            ],
        },
        {
            name: 'value',
            description: 'Choisissez la valeur à configurer',
            type: 'STRING',
            required: true,
        }
    ],
    runSlash(client, interaction) {
        
    }
}