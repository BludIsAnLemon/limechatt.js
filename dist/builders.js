const fs = require('fs')
const mim = require('mim')

/**
 * Builds an Attachment from the path
 */
class Attachment {
    /**
     * @param {string} path - The path of the image file
     * @param {string} alt  - The description of the image (optional)
     */
    constructor(path, alt = '') {
        this.path = path
        this.alt = alt
    }
    toString() {
        try {
            const buffer = fs.readFileSync(this.path)
            const mimeType = mim.getMIMEType(this.path)
            const data_uri = `data:${mimeType};base64,${buffer.toString('base64')}`
            return data_uri
        } catch (error) {
            console.error(new Error(error))
            return ''
        }
    }
}

module.exports = {Attachment: Attachment}