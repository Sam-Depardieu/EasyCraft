module.exports = {
    name: 'G',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position G.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};