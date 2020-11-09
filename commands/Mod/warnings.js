const fs = require("fs");
const ms = require("ms");
module.exports={
	name:"warnings",
	category:"mod",
	description:"check user warnings",
	run: (client, message, args, MessageEmbed)=>{
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
  let wnUser = message.mentions.users.first()
let wUser = wnUser.id
  if(!wnUser) return message.reply("Couldn't find them ");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
  let warnlevel = warns[wUser].warns;
const bed = new MessageEmbed()
.setTitle("Warnings")
.setDescription(`<@${wUser}> has ${warnlevel} warnings.`)
.setThumbnail("https://5.imimg.com/data5/JM/UD/NR/SELLER-38171330/warning-signs-500x500.png")
.setFooter(message.author.tag)
message.channel.send(bed)

	}
}