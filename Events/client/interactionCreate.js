module.exports = {
    name: "interactionCreate",
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand()){
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply('Cette commande n\'existe pas!');

            if (!interaction.member.permissions.has([cmd.permissions])) 
            return interaction.reply({content :`Vous n'avez pas la/les permission(s) requise(s) (\`${cmd.permissions.join(', ')}\`) pour taper cette commande!`, ephemeral: true});

            cmd.runSlash(client, interaction);
        } else if (interaction.isButton()){
            const allowedValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
            const btm = client.buttons.get(interaction.customId);

            if (allowedValues.includes(interaction.customId)) {
                interaction.reply(`Vous avez appuyé sur le bouton ${interaction.customId}`);
            } else if (!btm) {
                return interaction.reply('Ce button n\'existe pas!');
            } else {
                btm.runSlash(client, interaction);
            }
        }

    },
}