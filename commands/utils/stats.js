const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const client = require("../../hydra");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Replies with amount of guilds the bot is currently in!"),
    async execute(interaction) {
        interaction.client.shard.fetchClientValues('guilds.cache.size')
            .then(results => {
                const parsedGuildSize = results.reduce((prev, val) => prev + val, 0)

                const statsEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .addFields(
                            { name: "Amount of guilds the bot is currently in:", value: parsedGuildSize.toString() },
                        )
                        .setTimestamp()
                        .setFooter({ text: "Sent using Hydra" })
                    interaction.reply({embeds : [statsEmbed]});
            })
            .catch(console.error);
    },
};