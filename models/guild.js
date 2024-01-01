const mongoose = require('mongoose');
const guildschema = mongoose.Schema({
    id: String,
    name: String,
    prefix: { 'type': String, 'default': '!' },
    boostXp: { 'type': Number, 'default': 1 },
    logChannelID: { 'type': String, 'default': '0'},
    ideaChannelID: {'type': String, 'default': '0'},
    welcomeChannelID: {'type': String, 'default': '0'},
    nwMemberRoleID: {'type': String, 'default': '0'},
    categoryTicket: {'type': String, 'default': '0'}
});

module.exports = mongoose.model('Guild', guildschema);