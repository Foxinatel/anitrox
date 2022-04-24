import * as Discord from 'discord.js';
import { Command } from 'types/Command';

module.exports = new class implements Command {
  name = require('path').parse(__filename).name;
  description = 'Sets your nickname';
  options = [{
    name: 'name',
    description: 'The new nickname',
    required: true,
    type: Discord.Constants.ApplicationCommandOptionTypes.STRING
  }];

  handleMessage (_client: Discord.Client, message: Discord.Message) {
    return message.channel.send(this.handle());
  }

  handleInteraction (_client: Discord.Client, interaction: Discord.CommandInteraction) {
    return interaction.reply(this.handle());
  }

  handle () {
    return "Discord has an inbuilt slash command for this, so I think it's best we deprecate this";

    // const avatarURL = message.author.displayAvatarURL();

    // if (message.channel.permissionsFor(message.author).has('CHANGE_NICKNAME')) {
    //   const newnick = args.slice(0).join(' ');
    //   try {
    //     await message.member.setNickname(newnick, "Nickname change requested by the server member. If you don't want users to be able to change their nickname disable 'CHANGE_NICKNAME' via Change Nickname in Roles.");
    //     await message.channel.send({
    //       embeds: [{
    //         title: '<:AnitroxSuccess:809651936819019796> Nickname Changed',
    //         color: 9442302,
    //         footer: {
    //           icon_url: message.author.displayAvatarURL(),
    //           text: config.footerTxt
    //         },
    //         fields: [
    //           {
    //             name: 'Changed nickname successfully!',
    //             value: `New Nickname: ${newnick}`
    //           },
    //           {
    //             name: 'New Nickname',
    //             value: newnick,
    //             inline: true
    //           }
    //         ]
    //       }]
    //     });
    //   } catch (error) {
    //     await message.channel.send(client.generateErrorMessage('Failed to set user nickname. Does the bot have the correct permissions?', avatarURL));
    //   };
    // } else {
    //   await message.channel.send(client.generateErrorMessage('You need to have permission ``CHANGE_NICKNAME`` to change your nick!', avatarURL));
    // }
  }
}();
