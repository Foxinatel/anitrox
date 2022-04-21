module.exports = {

  name: require('path').parse(__filename).name,
  description: 'Restarts the bot',

  async execute (client, message, _, config) {
    if (message.author.id === config.ownerID) {
      console.log('Anitrox is restarting now!');
      await message.channel.send('<a:NyabotWorking:697147309531594843> Restarting...');
      try {
        client.destroy();
        await client.login(config.token);
        await message.channel.send('<:NyabotSuccess:697211376740859914> Restart Successful');
        console.log('All systems go');
      } catch (e) { console.log(e); }
    } else {
      await message.channel.send('<:NyabotDenied:697145462565896194> Access Denied, You must be bot owner to execute this command.');
    }
  }
};
