const EventEmmiter = require('events')
const {NetworkError, ParsingError, LengthError} = require('./custom_errors')
const WebSocket = require('ws')

class Client {
    /**
     * @param {string} name - The name of the bot
     */
    constructor(name) {
        this.name = name
        this.events = new EventEmmiter()
        try {
            this.server = new WebSocket('')
        } catch (error) {
            this.server = ''
        }
        this.connected = false
    }
    /**
     * Connects the bot to the LimeChatt Server
     * @returns {undefined}
     */
    connect() {
        try {
            this.server = new WebSocket('wss://limechatt.derpygamer2142.com')

            this.server.onclose = (() => {this.connected = false})
            this.server.onopen = (() => {
                this.connected = true
                this.events.emit('connect')
            })
            this.server.onmessage = (msgData => {
                if(!this.connected || this.server.readyState === 2 || this.server.readyState === 3) return
                try {
                    const parsedData = JSON.parse(msgData.data)
                    if(!(parsedData.type == 'message') || parsedData.author == this.name) return
                    this.events.emit('messageRecieved', parsedData.content, parsedData.author, parsedData.date)
                } catch (error) {console.error(`Parsing message failed! ${new ParsingError(error.message)}`)}
        })
        } catch (error) {
            console.error(`Connection failed! ${new NetworkError(error.message)}`)
        }
    }
    /**
     * Fires when the bot recieved message from the server
     * @param {function} callback - The function that handles messages; Takes 3 arguments: content, author, and date
     */
    onMessageReceived(callback = (content, author, date) => {}) {
        this.events.on('messageRecieved', (content, author, date) => {callback(content, author, date)})
    }
    /**
     * Fires when the bot gets connected to the server
     * @param {function} callback - The function to handle when the bot gets connected to the server.
    */
    onConnected(callback = () => {}) {
        this.events.once('connect', () => {callback()})
    }
    /**
     * Sends a message to the LimeChatt Server
     * Raises a length error if the message is longer than 850 characters
     * @param {string} msg
     * @returns {undefined}
     */
    send(msg) {
        try {
            if(msg.length > 850) throw new LengthError('Message too long!') // The LimeChatt Backend limits message lenght to 850 characters. So i did the same with this.
            this.server.send(JSON.stringify({type: 'sendMessage', content: msg, author: this.name, date: new Date()}))
        } catch (error) {
            console.error(new Error(error))
        }
    }
}

module.exports = {Client: Client}