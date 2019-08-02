const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const initRouter = require('./router');
const response = require('./response');

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));
initRouter(app);
app.use(response);

module.exports = app;
