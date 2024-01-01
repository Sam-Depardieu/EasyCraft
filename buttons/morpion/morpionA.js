module.exports = {
    name: 'A',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position A.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);
    }
};