import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
 data: new SlashCommandBuilder().setName('stats').setDescription('Replies with some handy stats about the server!'),
 async execute(interaction) {
  let totalUsersFetch = '';
  const totalUsers = interaction.guild.members.fetch().then((totalUsers) => {
   totalUsersFetch = totalUsers.map((x) => x)
  })
  console.log(totalUsersFetch)
  interaction.client.cluster
   .fetchClientValues('guilds.cache.size')
   .then(() => {
    const owner = interaction.guild.ownerId;
    const ownerDisplayName = interaction.client.users.cache.get(owner);

    const statsEmbed = new EmbedBuilder()
     .setColor(0x0099ff)
     .addFields(
      {
       name: 'Owner of server:',
       value: ownerDisplayName.username,
      },
      { name: 'Amount of members:', value: totalUsersFetch[0].guild.memberCount },
     )
     .setTimestamp()
     .setFooter({
      text: 'Sent using Fira',
      iconURL:
       'https://cdn.discordapp.com/attachments/1171358299409617011/1260485101905645568/FiraLogo.jpeg?ex=668f7dba&is=668e2c3a&hm=7c023e2a9df44ca40816a976179870f3b55941196a431c537a5768a330690032&',
     });
    interaction.reply({ embeds: [statsEmbed] });
   })
   .catch(console.error);
 },
};
