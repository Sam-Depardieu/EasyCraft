const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id: String,
    pseudo: String,
    lvl: {'type': Number, 'default':0},
    exp: {'type': Number, 'default':0},
    nextExpReq:  {'type': Number, 'default':5},
    expTotal: {'type': Number, 'default':0}
});

module.exports = mongoose.model('User', userSchema);