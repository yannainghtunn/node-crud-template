const express = require("express");
const app = express();
const Knex = require("knex");
const { Model } = require("objection");


// Load Env Variables.
require('dotenv').config();

 // Database Conneciton
const knexConfig = require("./knexfile").development;
const knexConnection = Knex(knexConfig);
Model.knex(knexConnection);



// Add Middlwares
const logMiddleware = require("./middlewares/log_middleware");
const bodyParser = require('body-parser').json();

app.use(bodyParser);
app.use(logMiddleware);



// IMPORT ROUTER - V1
const API_ROUTER = require("./routers").API_V1_ROUTER;
app.use("/logistic/v1",API_ROUTER);


// Error Handlers
app.use(require("./middlewares/error_handler").errorLogger);
app.use(require("./middlewares/error_handler").errorHandler);



app.listen( process.env.SERVER_PORT || 8000, () => {
    console.log(`Server Listening on :${process.env.SERVER_PORT}`);
});
