const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};
io.on('connection', socket =>{
    const { user } = socket.handshake.query;
    
    connectedUsers[user] = socket.id;
});


mongoose.connect('mongodb+srv://erbon:erbon@tindev-db-7mtkr.mongodb.net/dbtindev?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
})

app.use(cors());
app.use(express.json());
var porta = process.env.PORT || 8080;
app.use(routes);


server.listen(porta); 
