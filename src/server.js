const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const server = express();
mongoose.connect('mongodb+srv://erbon:erbon@tindev-db-7mtkr.mongodb.net/dbtindev?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});


server.use(cors());
server.use(express.json());

server.use(routes);
server.listen(3333,"https://tindev-back-end.herokuapp.com"); 