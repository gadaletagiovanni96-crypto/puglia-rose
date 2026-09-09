require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const http = require('http');
const {Server} = require('socket.io');

const app = express();

//inizializzazione Socket.io
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        credentials: true
    }
});

const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:5173', //per parlare con React
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, //serve per non salvare la sessione se non ci sono modifiche
    saveUninitialized: false, //non crea sessioni vuote per utenti non loggati
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const ticketRoutes = require('./routes/tickets');
app.use('/api/tickets', ticketRoutes);

require('./sockets/gestoreChat')(io);

const messageRoute = require('./routes/message');
app.use('/api/messages', messageRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('Connesso al DB');
        app.listen(PORT, ()=>{
            console.log('Server in ascolto');
        });
    })
    .catch((e)=>{
        console.log('Errore: ', e);
    });