import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import axios from 'axios';
import { errorEmbed } from '../../templates/embeds/errors/errorEmbed.js';

export default {
 data: new SlashCommandBuilder().setName('dadjoke').setDescription('Replies with a (slightly corny) dad joke'),
 async execute(interaction) {
  axios({
   method: 'get',
   url: 'https://icanhazdadjoke.com/',
   responseType: 'json',
   headers: {
    Accept: 'application/json',
   },
  })
   .then(function (response) {
    const dadJokeEmbed = new EmbedBuilder()
     .setColor(0x0099ff)
     .addFields({ name: 'Dad Joke', value: response.data.joke })
     .setTimestamp()
     .setFooter({
      text: 'Sent using Inferna',
      iconURL:
       'https://cdn.discordapp.com/attachments/1126688226590085230/1260169728073404469/InfernaLogo.jpeg?ex=668e5803&is=668d0683&hm=e84b1cec8c78ae2142842ba9b7154b65d8e9801bc21f0dd4c2b7a860cf2e4d18&',
     });
    interaction.reply({ embeds: [dadJokeEmbed] });
   })
   .catch(err => {
    console.log(
     `Woah there has been an error with the dad joke command. Here it is: 
` + err,
    );
    interaction.editReply({ embeds: [errorEmbed] });
   });
 },
};
