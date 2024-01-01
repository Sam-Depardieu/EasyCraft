module.exports = {
    name: 'H',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position H.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};