const gifchoices = [
  "https://media.discordapp.net/attachments/803658122299572255/806775382995894282/anime-couple-snuggle-gif-5.gif?width=450&height=238",
  "https://media.discordapp.net/attachments/803658122299572255/806775411928989726/snuggl1.gif",
  "https://cdn.discordapp.com/attachments/803658122299572255/806775422833786911/ImpureDeepAmbushbug-small.gif"
];


module.exports = {

  name: "snuggle",
  description: "Snuggle an user!",
  async execute(_0, message, _1, footer) {
    const taggedUser = message.mentions.users.first();
    
    if(!taggedUser) {
      await message.channel.send({embed: {
        "title": "<:AnitroxError:809651936563429416> Error",
        "color": 13632027,
        "footer": footer,
        "fields": [
          {
            "name": "Well that happened...",
            "value": "You need to @mention an user!"
          }
        ]
      }});
    } else {
      await message.channel.send({embed: {
        "title": "<:BlobSnuggleCat:806759753450782731> Snuggle",
        "description": "<@" + taggedUser + ">" + " You have been snuggled by " + "<@" + messageAuthor + ">!",
        "color": 9442302,
        "footer": footer,
        "image": {
          "url": gif
        }
      }});
    }
  }
}