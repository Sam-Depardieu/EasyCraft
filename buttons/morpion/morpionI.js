module.exports = {
    name: 'I',
    async runSlash(client, interaction) {
        const msg = await interaction.reply({ content: 'Vous jouez la position I.', ephemeral: true });
        setTimeout(() => {
            interaction.deleteReply();
        }, 2000);    }
};