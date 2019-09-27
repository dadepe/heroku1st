const crypto = require('crypto');

const hash = function (password, secret){
    return crypto.createHmac('sha256', secret)
                   .update(password)
                   .digest('hex');

}

module.exports = hash