console.clear()
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./Routes/routes');
const cors = require('cors')
// middle ware 
app.use(cors())
app.use(express.json())
app.use('/', routes);

module.exports = app;