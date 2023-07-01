const { Client, Partials, Collection } = require("discord.js");

const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: 3276799,
    partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");
const { loadButtons } = require("./Handlers/buttonHandler");
const { loadMenus } = require("./Handlers/menuHandler");

require("dotenv").config();

// Colecciones
client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();
client.menus = new Collection();

loadEvents(client);
loadButtons(client);
loadMenus(client);

client.login(process.env.token);

require(`./Handlers/antiCrash`)(client);
