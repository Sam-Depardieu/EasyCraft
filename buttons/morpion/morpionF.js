module.exports = {
    name: 'F',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position F.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};