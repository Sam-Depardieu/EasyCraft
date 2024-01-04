module.exports = {
    name: 'add-role',
    async runSlash(client, interaction) {
        try {
            await interaction.reply({ content: 'Vous avez bien reçu votre rôle.', ephemeral: true });
        }
        catch{
            await interaction.reply({ content: 'Quelque chose s\'est mal passé.', ephemeral: true });
        }
    }
};