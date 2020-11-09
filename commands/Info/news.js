const NewsAPI = require("newsapi");

module.exports = {
  name: "news",
  category:"Info",
    usage:"!news ",
  run: (client, message, args, MessageEmbed) => {
    let mg = message.content.split(" ").slice(1);
    var key = new NewsAPI("df48a88c18cf4a1c8e8178e43e3bd927");
    key.v2.everything({ q: mg.join(" "), language: "en" }).then(vari => {
      let data = vari.articles;
      let val = data[Math.floor(Math.random() * data.length)];
      console.log(val);
      const bed = new MessageEmbed()
        .setTitle(val.title)
        .setAuthor(val.author+"\n")
        .setImage(val.urlToImage)
        .setDescription(val.description)
        .addField("source", `[${val.source.name}](${val.url})`)
        .addField("Content", val.content)
        .setFooter(val.publishedAt);
      message.channel.send(bed);
    });
  }
};
