const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INTEGRATIONS
  ],});
const dotenv = require('dotenv');
var clc = require("cli-color");
const { red } = require('cli-color');
dotenv.config();
const mongoose = require('mongoose')

client.commands = new Collection();
client.buttons = new Collection();

['CommandUtil', 'EventUtil', 'ButtonUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });
require('./utils/functions')(client);

process.on('exit', code => { console.log(clc.red(`Le processus s'est arrêté avec le code: ${code}!`)) });

process.on('uncaughtException', (err, origin) => { console.log(clc.red(`UNCAUGHT_EXCEPTION: ${err}`, `Origine: ${origin}`)) });

process.on('unhandledRejection', (reason, promise) =>  { console.log(clc.red(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise)) });

process.on('warning', (...args) => console.log(clc.red(...args)));

mongoose.connect(process.env.URI , {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(() => { console.log('Le client est connecté à la base de donnée') })
.catch(err => { console.log(err) });


client.login(process.env.TOKEN);