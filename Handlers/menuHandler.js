async function loadMenus(client) {
    const { loadFiles } = require("../Functions/fileLoader");
    const ascii = require("ascii-table");
    const table = new ascii()
        .setHeading("Menus", "Stats")
        .setBorder("|", "=", "0", "0");

    await client.menus.clear();
    const Files = await loadFiles("Menus");
    console.log(Files);
    Files.forEach((file) => {
        const menu = require(file);
        client.menus.set(menu.data.name, menu);
        table.addRow(menu.data.name, "🟢");
    });

    return console.log(table.toString(), "\nMenus Loaded");
}

module.exports = { loadMenus };
