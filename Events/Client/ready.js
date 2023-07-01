const { loadCommands } = require("../../Handlers/commandHandler");
require("dotenv").config();
const mongoose = require("mongoose");
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await mongoose.connect(process.env.mongopass, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "KyubiBot",
        });
        if (mongoose.connect) {
            console.log(
                `El bot se ha conectado a la base de datos correctamente`
            );
        }

        loadCommands(client);
    },
};
