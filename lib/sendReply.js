async function sendReply(message, reply){
  const allowed = message.channel.name === 'spam' || message.member ? !!message.member.roles.find("hoist", true) : false
  const dm = message.channel.type === 'dm'

  if(reply){
    const {reaction, response, files} = reply
    if(reaction) message.react(reaction)

    if(allowed){
      if(response || files) message.reply(response, {files})
    }else {
      if(response) message.author.send(response, {files}) // reply dm

      if(!dm){
        await message.react('👋')
        message.delete(2000)
      }
    }
  } else{
    await message.react('❓')
    if(!dm){
      message.delete(2000)
    }
  }
}


module.exports = sendReply
