import ServerS from "./class/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";



// const server = new ServerS();
const server = ServerS.instance;

// BodyParser
// Los middlewares son códigos que se ejecutan antes de que una petición HTTP llegue al manejador de rutas o antes de que un cliente reciba una respuesta,
// basicamente es.. lo q envíen, tomalo y pasalo a json.
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
// permitir que cualquier persona pueda llamar mis servicios
server.app.use( cors({ origin: true, credentials: true }) )

// Rutas de servicio
server.app.use('/', router)


server.start(() => {
    console.log(`El servidor corriendo en el puerto ${ server.port }`);
})