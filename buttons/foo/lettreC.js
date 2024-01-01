module.exports = {
    name: 'lettreC',
    async runSlash(client, interaction) {
        await interaction.reply({ content: 'Votre réponse a été enregistrée.', ephemeral: true });
    }
};