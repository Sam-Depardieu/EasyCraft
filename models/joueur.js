const mongoose = require('mongoose');
const joueurSchema = mongoose.Schema({
    id: String,
    pseudo: String,
    inv: {type:[String], default:[""]}
});

module.exports = mongoose.model('Joueur', joueurSchema);