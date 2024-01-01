module.exports = {
    name: 'D',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position D.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};