const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectBD = require('./config/db_connection');
const dotenv = require('dotenv').config()

connectBD();
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use("/getAllContacts", require("./routs/contactRoutes"))
app.use("/user", require("./routs/userRoutes"))
app.use(errorHandler)

app.listen(port,()=>{
    console.log('Server running on port : ',port);
})    