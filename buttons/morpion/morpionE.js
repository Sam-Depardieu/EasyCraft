module.exports = {
    name: 'E',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position E.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};