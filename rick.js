const morty = require("aoi.js")
var fs = require('fs')
const bot = new morty.Bot({
    token:process.env.token,
    prefix:"?"
})
bot.onJoined()
bot.onLeave()
bot.onMessage()
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"))
for(const file of reader) {    
    const command = require(`./komutlar/${file}`)
    bot.command({
        name: command.name,
        code: command.code
    })
}

bot.command({
  name:"ping",
  code:`
  Gecikmem : $ping | Bot gecikmesi : $botPing
  `
})

bot.status({
    text: `Rick Code`,
    type: "PLAYING",
    status: "dnd",
    time: 12
})

bot.variables({
 hex:"66ffff",
 footer:"Rick Code",
 apihata:"**Bilinmeyen Bir Hata Oluştu**",
  })