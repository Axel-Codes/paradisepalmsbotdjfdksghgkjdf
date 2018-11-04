var discord = require('discord.js');
var client = new discord.Client();

client.on("ready", () => {
client.user.setActivity(`Pardise Palms`, { type: "LISTENING" })
client.user.setStatus("dnd")
console.log(`Paradise Palms is sucsessfuly online!`);
});

client.on('guildCreate', guild => {
	guild.leave()
});

var prefix = 'br!';

function isCommand(command, message){
	var command = command.toLowerCase();
	var content = message.content.toLowerCase();
	return content.startsWith(prefix + command);
}

client.on('message', (message) => {
	if (message.author.bot)return;
	if (message.channel.type == 'dm' && message.content.includes(prefix)) return message.reply('Commands only work in servers!');
    var args = message.content.split(/[ ]+/)
    
	if(isCommand('ban', message)){
		if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
		if(!message.member.hasPermission("BAN_MEMBERS"))
		if(!message.member.hasPermission("ADMINISTRATOR"))
		  return message.reply("Sorry, you don't have permissions to use this!");
		let members = message.mentions.members.first();
		if(!members)
		  return message.reply("Please mention a valid member of this server");
		  var logs = message.guild.channels.find('name', 'logs')
		   if(!logs) return message.reply("There is no `logs` channel.")
	
		if(!members.bannable) 
		  return message.reply("I cannot ban this user! Do they have a higher role? Do I have kick permissions?");
		   var reason = args.slice(2).join(" ");
		   if(!reason) return message.reply(`Please specify a reason.`);
		  message.guild.member(members).ban({ reason: reason });
	
		message.reply(`Successfully Banned!`);
		var embed = new Discord.RichEmbed()
		.setAuthor("Ban")
		.setColor("#FF0000")
		.addField("Member ", members.user.tag)
		.addField("Moderator ", message.author.tag)
		.addField("Reason ", reason)
		logs.send(embed)
		
		message.mentions.users.first().send(`You've been banned by ${message.author} for ${reason} in ${message.guild.name}`);
	}else
if(isCommand('kick', message)){
	if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
	if(!message.member.hasPermission("KICK_MEMBERS"))
	if(!message.member.hasPermission("ADMINISTRATOR"))
	 return message.reply("Sorry, you don't have permissions to use this!");
	  
		var logs = message.guild.channels.find('name', 'logs')
		if(!logs) return message.reply("There is no `logs` channel.")
	  let member = message.mentions.members.first();
	  if(!member)
		return message.reply("Please mention a valid member of this server");
	  if(!member.kickable) 
		return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
		var reason = args.slice(2).join(" ");
		if(!reason) return message.reply(`Please specify a reason.`);
		message.guild.member(member).kick();
  
	message.reply(`Successfully Kicked!`);
		  var embed = new Discord.RichEmbed()
	  .setAuthor("Kick")
	  .setColor("#FFFF00")
	  .addField("Member ", member.user.tag)
	  .addField("Moderator ", message.author.tag)
	.addField("Reason ", reason)
	  logs.send(embed);
	  message.mentions.users.first().send(`You've been kicked by ${message.author} for ${reason} in ${message.guild.name}`);
} else
if(isCommand('ping', message)){
	message.reply(`:ping_pong: Pong!\n${Math.round(client.ping)}ms`)
} else
if(isCommand('warn', message)){
    if(!message.member.roles.some(r=>["Administrator", "Moderator"].includes(r.name)) )
    if(!message.member.hasPermission("MANAGE_ROLES"))
    if(!message.member.hasPermission("ADMINISTRATOR"))
     return message.reply("Sorry, you don't have permissions to use this!");
	let members = message.mentions.members.first();
    if(!members)
      return message.reply("Please mention a valid member of this server");
       var reason = args.slice(2).join(" ");
       if(!reason) return message.reply(`Please specify a reason.`);
       var logs = message.guild.channels.find('name', 'logs')
       if(!logs) return message.reply("There is no `logs` channel.")
	message.mentions.users.first().send(`You've been warned by ${message.author} for ${reason} in ${message.guild.name}`);
	message.reply(`Successfully Warned!`);
    var embed = new Discord.RichEmbed()
	.setAuthor("Warn")
	.setColor("#00FF00")
	.addField("Member ", members.user.tag)
	.addField("Moderator ", message.author.tag)
	.addField("Reason ", reason)
	logs.send(embed)
}
});

//   const embed = new Discord.RichEmbed()
  //  embed.setAuthor("Help Guide")
  //  embed.setDescription(`To execute one of my commands you have to type in ${config.prefix} first`)
   // embed.addField("Verification Commands", "verify\napprove\ndeny")
  //  embed.addField("Moderation Commands", "ban\nkick\ncreate\ngiverole\nremoverole\npurge\nsoftban\nunban\nwarn")
   // embed.addField("Fun Commands", "roll\ncowsay\nsay\nsnakesay\ndm")
  //  embed.addField("General Commands", "ping\ninvite\navatar\nservericon")
  //  embed.setFooter(`Requested by ${message.author.tag}`)
   // embed.setColor("RANDOM")
  //  message.channel.send(embed)
client.login(process.env.BOT_TOKEN);
