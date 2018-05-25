const getReply = require('./lib/getReply.js')
const sendReply = require('./lib/sendReply.js')
const settings = require('./settings');


// setup discord
const Discord = require('discord.js');

const client = new Discord.Client();
client.login(settings.discordKey);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


// setup firebase
const firebase = require('firebase')

firebase.initializeApp(settings.firebase);
const db = firebase.database()
const latestRef = db.ref('latestData')



// global data store, updated by firebase, read by discord
var latestData = {};

// listen for new firebase data
latestRef.on('value', snap => {
  latestData = snap.val()
  console.log(`firebase sent us latestData!`)
})

// listen for new messages
client.on('message', async (message) => {
  if( message.content.trim().startsWith('!') ){
    const reply = await getReply(message, latestData)

    sendReply(message, reply)
  }
});
