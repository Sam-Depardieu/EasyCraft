module.exports = {
    name: 'B',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position B.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);
    }
};