const { Client, Collection, MessageEmbed } = require("discord.js");
const fs = require("fs");
require("events").EventEmitter.defaultMaxListeners = 100;
const client = new Client();
client.on("ready", async function() {
  
  console.log("\x1b[31m\x1b[46monline  "+client.user.tag);
});
client.login();
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});
client.on("message", async message => {
  const prefix = "!";
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
  message.member = await message.guild.cache.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, message, args, MessageEmbed);
});     
client.on("message", message =>{
   if (message.content == "!verify"){
       if(message.channel.id == "717919229357064264") {
      message.member.role.add(message.guild.roles.cache.find(role => role.name ==="Verified"))
           const bed = new MessageEmbed()
           .setTitle("User Verified")
           .setDescription(`${message.author} had been verified in <#${message.channel.id}>`)
  message.author.send(bed).then(()=>{
     message.delete()
     })
     }else{
       message.delete()
       var ren = message.author.send("Your not in the Verification channel or user verified sucessfully").then(()=>{
         ren.react("❌")
       })
       }
   } else {
    if(message.channel.id == "717919229357064264") {
   if (message.content !== "!verify")
     message.delete()
   }else{
     
    }
   }
 })
