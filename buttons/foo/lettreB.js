module.exports = {
    name: 'lettreB',
    async runSlash(client, interaction) {
        await interaction.reply({ content: 'Votre réponse a été enregistrée.', ephemeral: true });
    }
};