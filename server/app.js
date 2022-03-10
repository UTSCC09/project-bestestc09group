const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require('./schema').schema;
const request = require('request');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const {
    GraphQLID,
    GraphALString,
    GraphQLList,
    GraphQLType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLObjectType
} = require("graphql");

var cors = require("cors");
require("dotenv").config();

const cookie = require('cookie');
var cors = require("cors");

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))
    .use(cors())
    .use(cookieParser())
    .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: true, sameSite: true}
}));

app.listen(3001, () => {
    console.log("server running at 3001");
});

// Hide credentials from public repository
let mdb_password = process.env.MDB_PASSWORD;
let db_name = process.env.DB_NAME;

app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/api/client_info', (req, res) => {
    return res.status(200).json({
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    })
})

// Connect to DB
mongoose
    .connect("mongodb+srv://bestestcscc09group:" + mdb_password + "@cluster0.ykdmy.mongodb.net/" + db_name + "?retryWrites=true&w=majority")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(err));