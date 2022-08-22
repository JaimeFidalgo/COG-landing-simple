//modulo de js que me permite crear una base de datos con un js. sera un archivo persistente que no se modifica con los commits como si la creo con un json normal y escribo sobre el

const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

let db;// para que sea el que sale de createConnection(); me da acceso a la base de datos desde los metodos en mis routes

async function createConnection() {
    const adapter = new FileAsync('./back-end/db/alpha-users.json');//crea el documento json. Devuleve un objeto

    db = await low(adapter); // le paso el objeto a lowdb. es asincrono, uso await. devuelve un objeto que lo llamo db

    db.defaults({
        alphaUsers: []
    }).write() //defino loa base de datos será un array que llenaré con objetos de usuarios individuales
};

const getConnection = () => {

    return db;
}

module.exports = {
    getConnection,
    createConnection
}



