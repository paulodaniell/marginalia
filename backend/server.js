const app = require("./src/app");
const port = 3000;

console.log("Servidor iniciando...");

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});