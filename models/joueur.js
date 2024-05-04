const mongoose = require('mongoose');
const joueurSchema = mongoose.Schema({
    id: String,
    pseudo: String,
    point: {type: Number, default: 0},
    force: {type: Number, default: 1},
    def: {type: Number, default: 1},
    speed: {type: Number, default: 1},
    inv: {type:[Number], default: []}
});

module.exports = mongoose.model('Joueur', joueurSchema);