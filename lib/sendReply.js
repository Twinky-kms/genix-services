function sendReply(message, replyObject){

      // reply is allowed if the role is hoisted from @everyone
      // and the message is not in general
      // reactions are allowed anywhere
      const spamChannel = 439057355968217088
      let hoisted = null
      let privateMessage = null


      if(message.member){
          const hoisted = !!message.member.roles.find("hoist", true)
      }else{
          const privateMessage = true
      }

      const isAllowed = message.channel.id == spamChannel || hoisted || privateMessage

      if(replyObject){
        let reaction = replyObject.reaction
        let response = replyObject.response
        let images = replyObject.files

        // reactions
        if(reaction) {
          if(typeof reaction === 'string') reaction = [reaction]; // convert strings to arrays

          for(emoji in reaction){
            if(reaction[emoji].length > 10){
              message.react(message.guild.emojis.get(reaction[emoji]))
            }
            else {
              message.react(reaction[emoji])
            }
          }
        }

        // response
        if((response || images)){
            // are they allowed to bot in this channe?
            if(isAllowed){
                // reply in channel
                message.reply(response, {
                  files: images
                });
            }else{
                // delete message
                // PM sender
                message.react('👋')
                  .then(message.delete(2000))

                message.author.send(response, {
                  files: images
                })
            }
        }
      }else{
          message.react('❓')
            .then(message.delete(2000))
      }
}

module.exports = sendReply
