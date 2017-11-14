const request   = require('request')
const Discord   = require('discord.js');
const { spawn } = require('child_process');

const config = require('./config.json')

const client = new Discord.Client()
const rest   = spawn('./y-bot-flask-rest.sh', {
  cwd: './program-y/bots/y-bot/' 
})

client.on('ready', () => {
  console.log('I am ready!')
})

client.on('message', message => {
  if (message.channel.id === config.channelid && 
      message.author.id !== client.user.id &&
      !message.content.startsWith('##') &&
      !message.author.bot &&
      message.type === "DEFAULT") {
    sendToBot(message.content, message.author.id, (reply) => {
      message.channel.send(reply[0].response.answer) 
    })
  }
})

rest.stdout.on('data', (data) => {
  console.log(`REST server: ${data}`)
})

sendToBot = (message, sessionid, callback) => {
  request(`http://localhost:5000/api/v1.0/ask?question=${message}&sessionid=${sessionid}`, function(error, response, body) {
    return callback(JSON.parse(body))
  })
}

client.login(config.token)
