module.exports = {
    name: 'C',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position C.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};