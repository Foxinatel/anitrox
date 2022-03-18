
module.exports = {
	
	name: 'invite',
	description: 'Add Anitrox to your beautiful server!',
	syntax: [],
	execute(client, message) {
		const {footerTxt} = require('../config.json');
		const embed = {
			"title": "Add Anitrox to your Server!",
			"description": "Weather you want stable, or that squeaky clean fresh PTB build, we gotchu.",
			"color": 9442302,
			"footer": {
			  "icon_url": message.author.displayAvatarURL(),
			  "text": footerTxt
			},
			"thumbnail": {
			  "url": "https://cdn.discordapp.com/attachments/803658122299572255/814352905394061322/anitroxaddsrvr.png"
			},
			"fields": [
			  {
				"name": "Anitrox",
				"value": "Get the ripe off the vine Anitrox! \n [Add Anitrox to your server](https://discord.com/oauth2/authorize?client_id=576805923964715018&scope=bot&permissions=8)"
			  },
			  {
				"name": "Anitrox PTB (Public Test Build)",
				"value": "So you want the fresh and hot builds straight from the oven? We gotchu \n [Add Anitrox PTB to your server](https://discord.com/oauth2/authorize?client_id=489125054261755925&scope=bot&permissions=66186303)"
			  },
			  {
				  "name": "Need help?",
				  "value": "Come join the Anitrox Support Server, for support and much more!\n [Anitrox Support Server](https://discord.gg/grebRGsBZ3)"  
			  }

			]
		  };
		  message.channel.send({ embed });
	},
};