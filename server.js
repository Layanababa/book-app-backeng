'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Data=require('./Data');
const seedBookCollection=require('./Data');
const seedOwnerUserCollection=require('./Data');
const getBookHandler=require('./Data');



const mongoose = require('mongoose');

const server = express();
server.use(cors());

const PORT = process.env.PORT;


// seedOwnerUserCollection();
// http://localhost:3001/book?email=leana_baba@yahoo.com
server.get('/book',getBookHandler);



server.listen(PORT, () => {
    console.log(`Listenging on PORT ${PORT}`);
})

server.get('/', (req, res) => {
    res.send('The home route')
})