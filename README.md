# LimeChatt.js
**Make [LimeChatt](https://limechatt.github.io) bots in few lines of code!**

![version](https://img.shields.io/npm/v/limechatt.js) ![total downloads](https://img.shields.io/npm/dt/limechatt.js/total.svg)
 ![downloads](https://img.shields.io/npm/dt/limechatt.js.svg) ![license](https://img.shields.io/npm/l/limechatt.js.svg)

---

```javascript
const {Client} = require('limechatt.js')

const myBot = new Client('Lime')
myBot.connect()

myBot.onConnected(() => {
    console.log('Bot is connected!')
    myBot.send(`Hello! Im ${myBot.name}.\nThis bot is made with LimeChatt.js`)
})

myBot.onMessageReceived((content, author, date) => {
    console.log(`Message Recieved!\nAuthor: ${author}\nContent: ${content}\nDate: ${date}`)
})
```

## INSTALLATION
```bash
$ npm install limechatt.js
```