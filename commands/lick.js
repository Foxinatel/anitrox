const gifchoices = [
  "https://cdn.discordapp.com/attachments/803658122299572255/805314244123951114/cef569820773b0f5d54ee34cfa18e1f8.gif",
  "https://cdn.lowgif.com/full/2027501b8fa5225c-.gif",
  "https://i.gifer.com/36Nx.gif",
  "https://media.tenor.com/images/e8bbe712a5f36bbe9545930894b08bf9/tenor.gif"
];

module.exports = {

  name: require('path').parse(__filename).name,
  description: "Licks a user!",
  
  async execute(client, message, _, config) {
    const taggedUser = message.mentions.users.first();
    const avatarURL = message.author.displayAvatarURL();

    if(!taggedUser) {
      await message.channel.send(client.generateErrorMessage("You need to @mention a user!", avatarURL));
    } else {
      const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
      await message.channel.send({embeds: [{
        "title": "<a:LeafeonLick:806396195089154058> Lick",
        "description": `${taggedUser} You have been licked by ${message.author}!`,
        "color": 8311585,
        "footer": {
          "icon_url": avatarURL,
          "text": config.footerTxt
        },
        "image": {
          "url": "https://cdn.discordapp.com/attachments/803658122299572255/805314244123951114/cef569820773b0f5d54ee34cfa18e1f8.gif"
        }
      }]});
    }
  }
}
