module.exports = {
    name: "rateLimit",
    once: false,
    execute(rateLimitData) {
        console.log("Límite de velocidad alcanzado:");
        console.log("Ruta:", rateLimitData.route);
        console.log("Método:", rateLimitData.method);
        console.log("Total:", rateLimitData.total);
        console.log("Restante:", rateLimitData.remaining);
        console.log(
            "Tiempo de reintentar después (ms):",
            rateLimitData.timeout
        );
    },
};
