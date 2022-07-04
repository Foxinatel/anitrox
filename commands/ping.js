module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Gets bot ping',
  options: [],

  async parseMessage (client, config, message, args) {
    await message.channel.send(await this.handle(client, config, message.author));
  },

  async parseInteraction (client, config, interaction) {
    await interaction.reply(await this.handle(client, config, interaction.user));
  },

  async handle (client, config, user) {
    return {
      embeds: [{
        title: ':ping_pong: Ping',
        description: `**Pong!** We pinged **${config.locations.get_random()}** and got ${client.ws.ping} ms.`,
        color: 9442302,
        footer: {
          icon_url: user.displayAvatarURL(),
          text: config.footerTxt
        }
      }]
    };
  }
};
