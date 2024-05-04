const note = require('../../noteBuildWeekly.json')

module.exports = {
    name: 'messageReactionAdd',
    once: false,
    async execute(client, messageReaction, user) {
        const message = messageReaction.message;
        const emojiName = messageReaction.emoji.name;
        const member = message.guild.members.cache.get(user.id);

        let nameVote = {}

        if (member.user.bot) return;

        if (emojiName === '🌟' && message.channelId === "" && note["active"])
        {
            if(nameVote[message.author.id][member.id])
            {
                const reply = message.reply("Vous avez déjà voté pour cette personne.")
                setTimeout(()  => {
                    reply.delete();
                }, 5000);
                return;
            }
            else
            {
                nameVote[message.author.id][member.id]
                if (!note[message.author.id]) {
                    note[message.author.id] = {
                        note : 1
                        
                    }
                    fs.writeFile("./noteBuildWeekly", JSON.stringify(note), (err) => {
                        if(err) console.log(err);
                    })
                }
                note[message.author.id]["note"]+=1;
                fs.writeFile("./noteBuildWeekly", JSON.stringify(note), (err) => {
                    if(err) console.log(err);
                })
                const reply = message.reply(`Vote pour ${message.author.username} bien pris en compte.`)
                setTimeout(()  => {
                    reply.delete();
                }, 5000);
            }
        }
    }
}