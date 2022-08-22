const express = require('express');
const app = express();
const morgan = require('morgan');
 var cors = require('cors') //para dar permiso al front de que puede interactuar con el back end
const path = require('path');

//inicio la base de datos
const {createConnection} = require('./database');
createConnection();

//Settings

app.set('port', process.env.PORT || 3000);
//process.env.PORT-> si un sistema operativo nos da un puerto, que lo tome, si no el que le definamos nostros:
//app.set('variable_name','variable value') hay algunas variables predefinidas como port

app.set('json spaces', 2); //hace que se vea mejor en el navegador los json, (no relevante)




//Middlewares
app.use(express.json());
//sirve para que express entienda json
//app.use es para usar funciones en el servidor

//morgan nos da datos cada vez que hago una peticion y los pinta en consola, es solo para desarrollo;
app.use(morgan('dev'))

//urlencoded nos permite recibir datos de formularios(inputs) del front. extended=false es porque no necesitamos imagenes, solo textos y numeros
app.use(express.urlencoded({ extended: true}));

// app.use(cors())// middleware de cors para dar permiso al front para interactuar con el back end

app.use(cors())





//Routes
//importo las rutas desde los archivos de la carpeta de rutas. mantengo el codigo ordenado
 app.use(require('./back-end/routes/routes'));



//Dar acceso al servidor a todos los archivos estáticos. de esta forma no tengo que crear una ruta para cada archivo del proyecto

 app.use(express.static(path.resolve(__dirname,'public')))

//Start Server
//app.get sirve para llamar a las variables que definimos en el servidor con app.set



app.listen(app.get('port'), () => {
    console.log('Server on Port: ', app.set('port'));
});

