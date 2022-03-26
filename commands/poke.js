const gifchoices = [
  "https://i.pinimg.com/originals/b4/95/fb/b495fb19f4b9a1b04f48297b676c497b.gif",
  "https://i.imgur.com/H7Ok5tn.gif",
  "https://media1.tenor.com/images/8fe23ec8e2c5e44964e5c11983ff6f41/tenor.gif?itemid=5600215"
];

module.exports = {

  name: "poke",
  description: "Pokes a user!",
  async execute(client, message, _, footerTxt) {
    const taggedUser = message.mentions.users.first();
    
    if(!taggedUser) {
      await message.channel.send(client.generateErrorMessage("You need to @mention a user!", message.author.displayAvatarURL()));
    } else {
      const gif = gifchoices[Math.floor(Math.random() * gifchoices.length)];
      await message.channel.send({embed: {
        "title": "👉 Poke!",
        "description": `${taggedUser} You have been poked by ${message.author}!`,
        "color": 8311585,
        "footer": {
          "icon_url": message.author.displayAvatarURL(),
          "text": footerTxt
        },
        "image": {
          "url": gif
        }
      }});
    }     
  }
}
