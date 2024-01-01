const { MessageEmbed } = require("discord.js");
const User = require('../../models/user.js')

const expCooldown = new Set();

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(client, message, guild) {

        if (message.author.bot) return;
        let prefix = client.getGuild(message.guild).prefix || "!";
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        
        let user = message.mentions.users.first();
        if(user && message.content.trim() === `<@${client.user.id}>`){
            message.channel.send("Mon prefix sur ce serveur est -> \`\`"+ prefix+"\`\`");
        }
        
        if(message.content === "Hey"|| message.content === "hey" || message.content === "Bonjour" || message.content === "bonjour" || message.content === "Salut" || message.content === "salut" || message.content === "Hello" || message.content === "hello" || message.content == "EasyCraft"){
            message.react("👋")
        }

        let userSettings = await client.getUser(message.author);
        if (!userSettings) {
            await client.createUser(message.author);
            userSettings = await client.getUser(message.author)
            return;
        }

        let guildSettings = await client.getGuild(message.guild);
        if (!guildSettings) {
            await client.createGuild(message.guild);
            guildSettings = await client.getGuild(message.guild)
            return;
        }

        //système de niveau 
        /*if (!expCooldown.has(message.author.id) && userSettings && !message.content.startsWith(prefix)) {
            const NowExp = userSettings.exp || 0;
            let NowLevel = userSettings.lvl || 0;

            let xpToAdd = Math.floor(Math.random() * 3 - 1) + 1;
            const totalExp = NowExp + xpToAdd;
            let nextLevel = 0;

            if(NowLevel<=15) {nextLevel = 2*(NowLevel+1)+14}
            else if(NowLevel<=30) {nextLevel = 5*NowLevel-19}
            else if(NowLevel>30) {nextLevel = 9*NowLevel-79}

            expCooldown.add(message.author.id);

            setTimeout(() => {
                expCooldown.delete(message.author.id)
            }, 2000)

            if (totalExp >= nextLevel) {
                switch (NowLevel) {
                    case 9:
                        message.member.roles.add("1174790331414360204");
                        message.channel.send(`Félicitations ${message.author} pour ce passage au niveau ${NowLevel+1} ! Tu reçois le rôle ${message.member.guild.roles.cache.get("1174790331414360204").name}. Ta progression est incroyable, on se retrouve au niveau \`\`${NowLevel+2}\`\` `);
                        break;
                    case 19:
                        message.member.roles.add("1174790406668554291");
                        message.channel.send(`Félicitations ${message.author} pour ce passage au niveau ${NowLevel+1} ! Tu reçois le rôle ${message.member.guild.roles.cache.get("1174790406668554291").name}. Ta progression est incroyable, on se retrouve au niveau \`\`${NowLevel+2}\`\` `);
                        break;
                    case 29:
                        message.member.roles.add("1174790500771962920");
                        message.channel.send(`Félicitations ${message.author} pour ce passage au niveau ${NowLevel+1} ! Tu reçois le rôle ${message.member.guild.roles.cache.get("1174790500771962920").name}. Ta progression est incroyable, on se retrouve au niveau \`\`${NowLevel+2}\`\` `);
                        break;
                    case 49:
                        message.member.roles.add("1178269070353772635")
                        message.channel.send(`Félicitations ${message.author} pour ce passage au niveau ${NowLevel+1} ! Tu reçois le rôle ${message.member.guild.roles.cache.get("1178269070353772635").name}. Ta progression est incroyable, on se retrouve au niveau \`\`${NowLevel+2}\`\` `);
                        break;
                    case 79:
                        message.member.roles.add("1178269158111182930")
                        message.channel.send(`${message.author} a réussi l'exploit de passer au niveau ${NowLevel+1} ! Va-t-il réussir à passer au suivant? En attendant il obtient le rôle ${message.member.guild.roles.cache.get("1178269158111182930").name}`)
                        break;
                    case 99:
                        message.member.roles.add("1178269421861601340")
                        message.channel.send(`${message.author} a réussi l'exploit de passer au niveau ${NowLevel+1} ! Va-t-il réussir à passer au suivant? En attendant il obtient le rôle ${message.member.guild.roles.cache.get("1178269421861601340").name}`)
                        break;
                    default:
                        if (NowLevel < 50) message.member.guild.channels.cache.get('1178394546292412477').send(`Félicitations ${message.author} pour ce passage au niveau ${NowLevel+1}! (${nextLevel})`);
                        else message.channel.send(`${message.author} a réussi l'exploit de passer au niveau ${NowLevel+1} ! Va-t-il réussir à passer au suivant ? (${nextLevel})`)
                        break;
                }
                await client.updateUser(message.author, {lvl: NowLevel+1, exp: 1, expTotal: client.expTotal+totalExp});
                
                userSettings = await client.getUser(message.author);
                NowLevel = userSettings.lvl || 0;
                if(NowLevel<=15) nextLevel = 2*(NowLevel+1)+14
                else if(NowLevel<=30) nextLevel = 5*NowLevel-19
                else if(NowLevel>30) nextLevel = 9*NowLevel-79

                await client.updateUser(message.author, {nextExpReq: nextLevel})

            }
            else { await client.updateUser(message.author, {exp : totalExp, nextExpReq: nextLevel}) }

        };*/

        //système de suggestion
        if(message.channelId === guildSettings.ideaChannelID && guildSettings)
        {
            let embed = new MessageEmbed()
                .setTitle(`Suggestion de ${message.author.username}`)
                .setThumbnail(message.author.displayAvatarURL())
                .setDescription(message.content)
                .setTimestamp()

            message.delete()
            let msg = await message.channel.send({ embeds: [embed] })
            msg.react("<:greenvalid:1179359430509346936>")
            msg.react("<:redcross:1179371066699808828>")


            let thread = await msg.startThread({
                name: `Suggestion de ${message.author.username}`,
                autoArchiveDuration: 60, // Durée de l'archivage automatique du fil en minutes
                reason: message.args
            });
            thread.send('Votre suggestion va être étudié par le staff! N\'hésitez pas à donner plus d\'information sur vous suggestion.');
        }

        //système de duel
        if(message.channelId === "1181947051215421470")
        {
            let thread = await message.startThread({
                name: `Débat proposé par ${message.author.username}`,
                autoArchiveDuration: 60, // Durée de l'archivage automatique du fil en minutes
                reason: message.args
            });
            thread.send('Donnez votre avis sur ce débat (pain au chocolat).');
        }

        if (!message.content.startsWith(prefix)) return;

        const cmdName = args.shift().toLowerCase();
        if (cmdName.length == 0) return;

        let cmd = client.commands.get(cmdName);
        if(!cmd) return;
        if (!message.member.permissions.has([cmd.permissions])) return message.reply(`Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`);

        if (cmd) cmd.run(client, message, args, guildSettings);
    },



};