const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'add-role',
    description: 'Commande add-role pour ajouter des rôles aux membres',
    permissions: ['ADMINISTRATOR'],
    async run(client, message, args){
        let role = message.mentions.roles.first() || message.guild.roles.cache.find((r) => r.name == args[1]) || message.guild.roles.cache.find((r) => r.id == args[1]);
        const member = message.mentions.members.first() || message.guild.members.cache.find((m) => m.user.tag === args[0]) || message.guild.members || message.guild.members.cache.find((m) => m.user.id === args[0]);
        if(member)
        {
            if(!member.roles.cache.has(role.id)) 
            {
                member.roles.add(role.id)
                return message.channel.send(`Le rôle ${role} à été donné à ${member}`)
            }
            message.channel.send(`Le membre ${member} à déjà le rôle ${role}`)
        }
        else{
            let msg = await message.channel.send("Le membre sélectionné n'existe pas")
            setTimeout(() => {
                msg.delete();
            }, 10000);
        }
    },
    options: [
        {
            name: 'membre',
            description: 'Mentionnez le membre ou utilisez son tag.',
            type: 'STRING',
            required: true,
        },
        {
            name: 'role',
            description: 'Mentionnez le rôle ou utilisez son nom ou ID.',
            type: 'STRING',
            required: true,
        },
    ],
    
    async runSlash(client, interaction) {
        const memberArg = interaction.options.getString('membre');
        const roleArg = interaction.options.getString('role');

        const role = interaction.guild.roles.cache.find((r) => r.name === roleArg) || interaction.guild.roles.cache.find((r) => r.id === roleArg) || interaction.mentions.roles.first();

        const member = interaction.guild.members.cache.find((m) => m.user.tag === memberArg) || interaction.mentions.members.first() || interaction.guild.members.cache.find((m) => m.user.id === memberArg);

        if (!member) {
            const embed = new MessageEmbed()
                .setDescription("Le membre sélectionné n'existe pas")
                .setColor('#ff0000');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!role) {
            const embed = new MessageEmbed()
                .setDescription("Le rôle spécifié n'existe pas")
                .setColor('#ff0000');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!member.roles.cache.has(role.id)) {
            try {
                await member.roles.add(role);
                const embed = new MessageEmbed()
                    .setDescription(`Le rôle ${role} a été donné à ${member}`)
                    .setColor('#00ff00');
                return interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(error);
                const embed = new MessageEmbed()
                    .setDescription("Une erreur s'est produite lors de l'ajout du rôle.")
                    .setColor('#ff0000');
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } else {
            const embed = new MessageEmbed()
                .setDescription(`Le membre ${member} a déjà le rôle ${role}`)
                .setColor('#ff0000');
            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}