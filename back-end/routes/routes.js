const express = require('express');
const router = express.Router(); //router() permite definir rutas. luego las exporto al index
// const betaUsers = require('../db/alpha-users.json')
const path = require('path');


const fs = require('fs'); //para escribir en el archivo .json

const {getConnection} = require('../../database') //con esto tengo acceso al objeto db que es la conexion a la base de datos
//getConnection me devuleve el objeto db que es el array con mi objeto alphaUsers;

const {v4} = require('uuid'); //lowdb no genera ids automaticamente, con este modulo lo hago
///////ROUTES///////

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/index.html'));//dirname te da la ruta del archivo, el js (routes) en este caso . es util porque se trabaja con rutas absolutas
})

router.get('/documentation/investor-deck', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/assets/pdf/Investor-Deck-V1.2.pdf'));//dirname te da la ruta del archivo, el js en este caso . es util porque se trabaja con rutas absolutas
})

router.get('/documentation/whitepaper', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/assets/pdf/Whitepaper V1.1.pdf'));//dirname te da la ruta del archivo, el js en este caso . es util porque se trabaja con rutas absolutas
})

router.get('/documentation/players-manual', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/assets/pdf/Players-guide.pdf'));//dirname te da la ruta del archivo, el js en este caso . es util porque se trabaja con rutas absolutas
})

router.get('/last-developer-posts/Post01', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../public/assets/posts/01-chains-of-glory-in-a-canvas.html'));//dirname te da la ruta del archivo, el js en este caso . es util porque se trabaja con rutas absolutas
})

router.get('/api/alpha-users', (req, res) => {
   const alphaUsers = getConnection().get('alphaUsers').value();
    res.json(alphaUsers);
})

router.post('/api/alpha-users', (req, res) =>{

    const newAlphaUser = {
        id: v4(),//v4() es una funcion del modulo uuid importado arriba
        user: req.body.user,
        mail: req.body.mail,
        address: req.body.address

    }
    getConnection().get('alphaUsers').push(newAlphaUser).write();
    res.send(newAlphaUser);

})

// para crear y escribir en un json sin lowdb, desechado

// router.get('/api/alpha-users', (req, res) => {
//     res.json(betaUsers);
// })

// router.post('/api/alpha-users', (req, res) => {
//     const { user, mail, address} = req.body;
//     if(user && mail && address){
//         const id = betaUsers.length + 1;
//         const newUser = {...req.body, id}
//         betaUsers.push(newUser); //escribir en el servidor

//         //escribir en el archivo .json (base de datos)
//         fs.readFile('back-end/db/alpha-users.json', 'utf8', function readFileCallback(err, data){
//             if (err){
//                 console.log(err);
//             } else {
//             obj = JSON.parse(data); //now it is an object
//             obj.push(newUser); //add some data
//             json = JSON.stringify(obj,null,2); //convert it back to json
//             fs.writeFile('back-end/db/alpha-users.json', json, 'utf8', function callback (err){
//                 if(err){
//                     console.log(err)
//                 }
//             } ); // write it back 
//         }});

//         res.send(betaUsers); //devolver resupesta en el servidor
//     } else {
//         res.send('data not saved, introduce it properly')
//     }
// })








module.exports = router;