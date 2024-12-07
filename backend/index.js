
const app = require('./src/app');

//variables de entorno con dotenv
require('dotenv').config()

//const PORT = 3000;
// deconstruye las variables de entorno
const {PORT} = process.env;

//SACAR ` con ALT + 96

app.listen(PORT || 3000, ()=> {
    console.log(`Server working on port http://localhost:${PORT}`)
}
);
