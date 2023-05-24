import express from 'express';
import './DAL/dbConfig.js';
import { __dirname } from './utils/dirname.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import apiRouter from './routes/api.router.js';
import viewsRouter from './routes/views.router.js';

import { messagesModel } from './DAL/models/messages.model.js';

import cookieParser from 'cookie-parser';
import session from 'express-session';

import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';

import passport from 'passport';

import './passport/passportStrategies.js';

import cors from 'cors';

import config from './config/config.js';

const PORT = config.PORT;

const URI = config.MONGO_ATLAS_URL;

const app = express();

const FileStoreSession = FileStore(session);

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/public', express.static(__dirname + '/public/html'));

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');

app.set('view engine', 'handlebars');

app.use(
  session({
    store: MongoStore.create({
      // nombre de la base de datos donde se guardarán las sesiones
      mongoUrl: URI,
      //ttl: 60 * 60 * 24 * 7, // 1 semana
    }),
    // resave es false para que no se guarde la sesión en cada petición
    resave: false,
    // saveUninitialized es false para que no se guarde la sesión en cada petición si no hay cambios en la sesión
    saveUninitialized: false,
    // secret es una cadena de texto que se usa para firmar la cookie de sesión
    secret: 'secreto',
    // maxAge es el tiempo de vida de la cookie de sesión en milisegundos
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 semana
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use('/api', apiRouter);

app.use('/', viewsRouter);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.set('port', PORT || 8080);

const httpServer = app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto: ', app.get('port'));
  console.log(`http://localhost:${app.get('port')}`);
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`);
  });

  socket.on('message', async (data) => {
    const newMessage = new messagesModel({
      user: data.user,
      message: data.msg,
    });
    await newMessage.save();

    socket.broadcast.emit('message', data);
  });

  socket.on('usuarioNuevo', async (usuario) => {
    socket.broadcast.emit('broadcast', usuario);

    const messages = await messagesModel.find();

    socket.emit('chat', messages);
  });
});
