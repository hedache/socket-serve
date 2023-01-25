
import express from 'express';
import { SERVER_PORT } from '../global/environment';
// import socketIO from 'socket.io';
import { Server } from "socket.io";
import http from 'http';
// importar todo lo que se encuentre en socket y ponerle un alias
import * as socket from '../sockets/socket';


export default class ServerS {


    private static _instance: ServerS;

    public app: express.Application ;
    public port: number;

    // public io: socketIO.Server;
    // servidor de sockets, tiene el control y conocimiento de q personas
    // están conectadas
    public io: Server;
    private httpServer: http.Server;


    // se pone el constructor privado para asegurarnos de solo tener una instancia del socketIo
    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        // lo ideal es que socket funcionara con express,
        // pero es que no son compatibles, por eso hay que usar
        // el http server de node

        this.io = new Server( this.httpServer );

        this.escucharSockets();

    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets() {

        console.log('Escuchando conexiones - Sockets');

        this.io.on('connection', cliente => {
            console.log('Cliente conectado');
            
            // Mensajes
            socket.mensaje(cliente, this.io);


            // desconectar
            socket.desconectar(cliente);

            // cliente.on('disconnect', () => {
            //     console.log('Cliente desconectado');
            // })
        });

    }


    start( callback: Function ) {

        // this.app.listen( this.port, callback() );
        this.httpServer.listen( this.port, callback() );

    }



}