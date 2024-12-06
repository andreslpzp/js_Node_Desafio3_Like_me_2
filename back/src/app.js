
//Importamos las Librerias base
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

//Importamos las Rutas del archivo de Rutas
const APIRoutes = require('./rutas/routes');

const app = express();

//configuracion de morgan, para mostra errores en consola
app.use(morgan('dev'));

//configurar cors en el servidor y sus opciones
app.use(cors(
    {
        origin: 'http://localhost:5173', // Permitir solo tu frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE'] // Métodos permitidos
    }
))

//configuracion de middleware dentro de express,librerias que necesito ejecute el servidor de backend
// este nos va a permitir abrir el JSON en el BACK cuando se realice en envio por el metodo POST
app.use(express.json());

//creacion de las rutas para las APIS:
app.use('/', APIRoutes)

module.exports = app;

//app.listen(3000, console.log("¡Servidor encendido!"))
//app.get("/home", (req, res) => {
//res.send("Hello World Express Js")
//})