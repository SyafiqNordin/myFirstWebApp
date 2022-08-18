const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv/config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt')

// const {product, Product} = require('./model/product');
const {user, User} = require('./models/users');
// const {order, Order} = require('./model/order');
// const {category, Category} = require('./model/category');

const api = process.env.API_URL;
const cns = process.env.CONNECTION_STRING;

//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// app.use(authJwt());

const usersRoutes = require('./routes/users');
app.use(`${api}/users`, usersRoutes);
app.get("/", (req,res) => {
  res.send(`hello everyone ${api}`);
});

// server
app.listen(3000, () => {
    console.log("server is running http://localhost:3000");    
});


//database connection
mongoose.connect(cns, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'nodejs_saimen'
}).then( () => {
    console.log("Database connection is ready...");
}).catch((err) => {
    console.log(`Error: ${err}`);
});