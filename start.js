#!/usr/bin/env -S node

const fs = require('fs');
const Discord = require('discord.js');
const { statuses, build, release, prefix, token, footerTxt } = require('./config.json');

console.log('Starting!')
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.generateErrorMessage = (errorMsg, messageAuthorURL) => ({embed: {
  "title": "<:AnitroxError:809651936563429416> Error",
  "color": 13632027,
  "footer": {
    "icon_url": messageAuthorURL,
    "text": footerTxt
  },
  "fields": [
    {
      "name": "Well that happened...",
      "value": errorMsg
    }
  ]
}})

client.on("error", (e) => console.log(`[ERROR] ${error(e)}`));
client.on("warn", (e) => (`[WARN] ${warn(e)}`));
client.once('ready', () => {
	console.clear()
	console.log('    ___          _ __                 ');
	console.log('   /   |  ____  (_) /__________  _  __');
	console.log('  / /| | / __ \\/ / __/ ___/ __ \\| |/_/');
	console.log(' / ___ |/ / / / / /_/ /  / /_/ />  <  ');
	console.log('/_/  |_/_/ /_/_/\\__/_/   \\____/_/|_|  ');
	console.log(`${release}, ${build}`);
	console.log("All Systems Go. | Anitrox by IDeletedSystem64 | ALL MY CODE KEEPS BLOWING UP!");
});


setInterval(async () => {
  // Picks a status from the config file
	const index = Math.floor(Math.random() * statuses.length);
	await client.user.setActivity(statuses[index]);
}, 20000);

// Begin Command Handler
client.on('message', async (message) => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	
	if (!client.commands.has(command)) return;

	try {
		await client.commands.get(command).execute(client, message, args, footerTxt);
	} catch (error) {
		console.stack;
		message.channel.send({embed: {
			"title": "<:AnitroxError:809651936563429416> **Something went wrong!**",
			"description": error.stack,
			"color": 13632027,
      "footer": {
        "icon_url": message.author.displayAvatarURL(),
        "text": footerTxt
      },
		}});
	}
});

client.login(token);