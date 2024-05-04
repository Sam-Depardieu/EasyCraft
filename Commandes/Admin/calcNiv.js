module.exports = {
    name: 'calculniv',
    description: 'say',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){

        let xpRequired = 0;

        for (let level = 0; level < args[0]; level++) {
            if (level <= 15) {
                xpRequired += 2 * (level + 1) + 14;
            } else if (level <= 30) {
                xpRequired += 5 * level - 19;
            } else if (level > 30) {
                xpRequired += 9 * level - 79;
            }
        }

        return message.channel.send(`Il faut ${xpRequired}xp pour accéder au niveau ${args[0]}.`);
    },
    options: [
        {
            name: 'niveau',
            description: 'Indiquez le niveau cible.',
            type: 'STRING',
            required: false
        }
    ],
    runSlash(client, interaction) {
            
        var text = interaction.options.getString("niveau");
        let xpRequired = 0;

        for (let level = 0; level < text; level++) {
            if (level <= 15) {
            xpRequired += 2 * (level + 1) + 14;
            } else if (level <= 30) {
            xpRequired += 5 * level - 19;
            } else if (level > 30) {
            xpRequired += 9 * level - 79;
            }
        }

        return message.channel.send(`Il faut ${xpRequired}xp pour accéder au niveau ${args[0]}.`);
    }
}