module.exports = {
    name: 'danger-button',
    async runSlash(client, interaction) {
        await interaction.reply({ content: 'Bonjour'})
    }
};