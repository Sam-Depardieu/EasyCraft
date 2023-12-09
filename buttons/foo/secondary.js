module.exports = {
    name: 'secondary-button',
    async runSlash(client, interaction) {
        await interaction.reply({ content: 'Bonjour 3' })
    }
};