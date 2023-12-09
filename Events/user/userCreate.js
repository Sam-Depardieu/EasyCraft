const { User } = require('../../models')

module.exports = {
    name: "userCreate",
    once: false,
    async execute(client, message) {
        await client.createUser(message);
    },
}