const aoi = require('aoi.js');
const bot = new aoi.Bot({
  token: process.env.token,
  prefix:"+" 
})

bot.onMessage()
bot.onJoined()
bot.onLeave()
bot.onInteractionCreate()

bot.loadCommands('./komutlar/');

bot.status({
  text:"Rick Code",
  type:"PLAYING",
  status: "dnd",
  time: 12
})

bot.readyCommand({
  channel:"",
  code:`
  $log[$userTag[$clientID] Giriş Yapıldı]
`})

bot.variables({
  ytrolid:"",
  ////Yetkili Rol ID
  ytlog:"",
  ////Onay Red Log(Üyelere Kapali Olsun Sadece Yetkililere Acik Olsun)
  botlog:"",
  /////Bot Log Kanal ID
  botekle:"",
  /////Bot Ekle Kanal ID
  geliştiricirol:"",
  //////Bot Gelistirici Rol ID
  botvar:"yok",
  hex:"BDAAF9",
  kayıtlıbot:""
})

bot.interactionCommand({
  name:"onay",
  code:`
  $sendDm[$authorID;⚒ Tebrikler \`\$userTag[$noMentionMessage[1]]\`\ Adlı Botunuz **$serverName** Adlı Sunucuda Kabul Edildi]
  $channelSendMessage[$getServerVar[botlog];⚒ <@$authorID> Botunuz Başarıyla Kabul Edildi]
  $giveRoles[$authorID;$getServerVar[geliştiricirol]]
  $interactionReply[Bot Başarıyla Kabul Edildi;;;64;4]
`})

bot.interactionCommand({
  name:"hayır",
  code:`
  $sendDm[$authorID;⚒ Üzgünüm \`\$userTag[$noMentionMessage[1]]\`\ Adlı Botunuz **$serverName** Sunucumuzdan Reddedildi]
  $channelSendMessage[$getServerVar[botlog];⚒ <@$authorID> Üzgünüm Botunuz Reddedildi]
  $setServerVar[botvar;yok;$authorID]
  $interactionReply[Bot Başarıyla Reddedildi;;;64;4]
`})

bot.leaveCommand({
  channel:"$getServerVar[botlog]",
  code:`
  $suppressErrors[]
  $ban[$getServerVar[kayıtlıbot;$authorID];Botlist]
  $sendDm[$authorID; Sunucudan Çıktığınız İçin \`\$userTag[$getServerVar[kayıtlıbot;$authorID]]\`\ Adlı  Botun Banlandı
  `
})