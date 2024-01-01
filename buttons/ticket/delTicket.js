module.exports = {
    name: 'del-ticket',
    async runSlash(client, interaction) {
        const channel = interaction.channel;

        interaction.reply("Ce ticket sera fermé dans 5 secondes");
        setTimeout(() => {
            channel.delete();
        }, 5000);
    }
};
