
const {Client, Attachment} = require('../dist/index.js')

const myBot = new Client('Lime1111')

myBot.connect()

myBot.onConnected(() => {
    console.log('Bot is connected!')
    myBot.send(`Hello! Im ${myBot.name}.\nThis bot is made with LimeChatt.js`)
})

myBot.onMessageReceived((content, author, date) => {
    console.log(content, author, date)
})