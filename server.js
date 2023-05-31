const express = require('express');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();
require('./src/config/dbConfig');


app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(3333);