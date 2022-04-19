import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from 'mongoose';
import passport from "../middlewares/passport.js";

import env from './env.config.js';
import dbConfig from "../db/config.js";
import apisRoutes from './routers/app.routers.js';

import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

// import authWebRouter from "./routers/web/auth.js";
// import homeWebRouter from "./routers/web/home.js";
// import productsApiRouter from "./routers/api/productos-test.js";

import addProductsHandlers from "./routers/ws/productos.js";
import addMenssagesHandlers from "./routers/ws/mensajes.js";

const PORT = env.PORT || 8080;

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//--------------------------------------------
// configuro el socket
io.on("connection", async socket => {
	addProductsHandlers(socket, io.sockets);
	addMenssagesHandlers(socket, io.sockets);
});

//--------------------------------------------
// configuro el servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  name: 'my-session',
	store: MongoStore.create({ 
    mongoUrl: dbConfig.mongodb.connectTo('sessions') 
	}),
  secret: [env.SESSION_SECRET],
	resave: false,
	saveUninitialized: false
	// cookie: { maxAge: 120000 }
}));
app.use(passport.initialize());
app.use(passport.session());

//--------------------------------------------
// Template engines
app.set('views', './views');
app.set("view engine", "ejs");

//--------------------------------------------
// rutas del servidor API
app.use(apisRoutes);

//--------------------------------------------
// rutas del servidor API REST
// app.use(productsApiRouter);

//--------------------------------------------
// rutas del servidor web
// app.use(authWebRouter);
// app.use(homeWebRouter);

//--------------------------------------------
// inicio el servidor
httpServer.listen(PORT, () => {
  mongoose.connect(dbConfig.mongodb.connectTo('ecommerce'))
  .then(() => {
    console.log('Connected to DB!');
    console.log('Server is up and running on port: ', +PORT);
  })
	.catch(err => {
		console.log(`An error occurred while connecting the database`);
		console.log(`Error en servidor `, err);
	})
});
