const mongoose = require('mongoose');
const guildschema = mongoose.Schema({
    id: String,
    name: String,
    prefix: { 'type': String, 'default': '!' },
    boostXp: { 'type': Number, 'default':1 },
    logChannelID: { 'type': String, 'default': '803171022357397555' },
    ideaChannelID: {'type':String, 'default': '1176266574852788314'}
});

module.exports = mongoose.model('Guild', guildschema);