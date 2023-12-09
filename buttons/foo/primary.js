module.exports = {
    name: 'primary-button',
    async runSlash(client, interaction) {
        await interaction.reply({ content: 'Bonjour 2'})
    }
};