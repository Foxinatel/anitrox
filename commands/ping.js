module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Gets bot ping',
  options: [],

  async parseMessage (client, config, message, args) {
    await message.channel.send(this.handle(client, config, message.author));
  },

  async parseInteraction (client, config, interaction) {
    await interaction.reply(this.handle(client, config, interaction.user));
  },

  handle: (client, config, user) => ({
    embeds: [{
      title: ':ping_pong: Ping',
      description: `**Pong!** We pinged **${config.locations.get_random()}** and got ${client.ws.ping} ms.`,
      color: 9442302,
      footer: {
        icon_url: user.displayAvatarURL(),
        text: config.footerTxt
      }
    }]
  })
};
