module.exports = {

    name: "nom",
    description: "Noms an user!",
    execute(client, message, args) {
      const {footerTxt} = require('../config.json');
      const taggedUser = message.mentions.users.first();
          
        // --------------------------------------
        const gifchoices = [
          "https://i.imgur.com/Ns1RBzX.gif",
          "https://cdn.lowgif.com/full/2027501b8fa5225c-.gif",
          "https://i.gifer.com/36Nx.gif",
          "https://media.tenor.com/images/e8bbe712a5f36bbe9545930894b08bf9/tenor.gif"
          
  
        ];
        const index = Math.floor(Math.random() * (gifchoices.length - 1) + 1);
        var gif = (gifchoices[index]);
        // ---------------------------------------    
        const errorembed = {
          "title": "<:AnitroxError:809651936563429416> Error",
          "color": 9442302,
          "footer": {
            "icon_url": "https://images-ext-2.discordapp.net/external/-qaO3jaZLojhEnjrHiKABdXD7gLWqFvdUqHdskNGWhE/https/media.discordapp.net/attachments/549707869138714635/793524910172667964/Screenshot_26.png",
            "text": "Made with ❤ in Illinois | Anitrox by IDeletedSystem64"
          },
          "fields": [
            {
              "name": "Well that happened...",
              "value": "You need to @mention an user!"
            }
          ]
        };
       
        if(!taggedUser) {
          return message.channel.send({ embed: errorembed});
        // Checks if a user was mentioned. If not, returns error message.
        }
        
      const embed = {
            "title": "<:BlobNomBlob:801241117919805510> Nom",
            "description": "<@" + taggedUser + "> You have been nommed by <@" + messageAuthor + ">!",
            "color": 8311585,
            "footer": {
              "icon_url": message.author.displayAvatarURL(),
              "text": footerTxt
            },
            "image": {
              "url": gif
            }
          }


          message.channel.send({ embed: embed });
            }
    }
