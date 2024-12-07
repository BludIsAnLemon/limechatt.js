class NetworkError extends Error{
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.name = 'NetworkError'
    }
}

class ParsingError extends Error{
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.name = 'ParsingError'
    }
}

class LengthError extends Error{
    /**
     * 
     * @param {string} message 
     */
    constructor(message) {
        super(message)
        this.name = 'LenghtError'
    }
}

module.exports = {NetworkError: NetworkError, ParsingError: ParsingError, LengthError: LengthError}