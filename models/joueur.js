const mongoose = require('mongoose');
const joueurSchema = mongoose.Schema({
    id: String,
    pseudo: String,
    lvlPickaxe: {type: String, default: "piocheB"},
    inv: {type:[String], default:["1","2","3"]}
});

module.exports = mongoose.model('Joueur', joueurSchema);