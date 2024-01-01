module.exports = {
    name: 'check',
    async runSlash(client, interaction) {
        await interaction.reply({ content: 'Le message de validitation à été envoyé au gagnant!', ephemeral: true });
    }
};