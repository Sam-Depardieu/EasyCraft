const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
var clc = require("cli-color");

module.exports = async client => {
    (await pGlob(`${process.cwd()}/buttons/*/*.js`)).map(async btmFile => {
        const btm = require(btmFile);
        if (!btm.name) {
            return console.log(clc.red(`-----\nCommande non chargée: pas de nom et/ou description \nFichier -> ${btmFile}\n-----`));
        };


        client.buttons.set(btm.name, btm);
        console.log(clc.green(`Button chargée: ${btm.name}`));
    });
    

};