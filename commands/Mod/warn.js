const fs = require("fs");
const ms = require("ms");
const Discord = require("discord.js")
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
module.exports = {
 name:"warn",
  aliases: ["wn"], 
  category: "Mod", 
  description: "warns🔨 User", 
  usage: "${prefix}warn @{mention} {reason}", 
  run: async (cli, message, args, MessageEmbed) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("No can do pal!");

  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])

  if(!wUser) return message.reply("Couldn't find them yo");

  if(wUser.hasPermission("ADMINISTRATOR")) return message.reply("They waaaay too kewl");

  let reason = args.join(" ").slice(22);


  if(!warns[wUser.id]) warns[wUser.id] = {

    warns: 0

  };


  warns[wUser.id].warns++;


  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {

    if (err) console.log(err)

  });


  let warnEmbed = new MessageEmbed()

  .setDescription("Warns")

  .setAuthor(message.author.username)

  .setColor("#fc6400")

  .addField("Warned User", `${wUser} | ${wUser.id}`)

  .addField("Warned In", message.channel)

  .addField("Number of Warnings", warns[wUser.id].warns)

  .addField("Reason", reason);


  let warnchannel = message.guild.channels.cache.find(channel => channel.name === "punishments");

  if(!warnchannel) return message.reply("Couldn't find channel");


  warnchannel.send(warnEmbed);


  if(warns[wUser.id].warns == 5){

    let muterole = message.guild.roles.cache.find(role => role.name === "muted");

    if(!muterole) return message.reply("mute role dosent exist.");


    let mutetime = "2h";

    await(wUser.role.add(muterole.id));

    message.channel.send(`<@${wUser.id}> has been temporarily muted`);


    setTimeout(function(){

      wUser.role.remove(muterole.id)

      message.reply(`<@${wUser.id}> has been unmuted.`)

    }, ms(mutetime))

  }

  if(warns[wUser.id].warns == 10){

    message.guild.member(wUser).ban(reason);

    message.reply(`<@${wUser.id}> has been banned.`)

  }


}
}
