const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require('./schema').schema;

require("dotenv").config();

var cors = require("cors");


var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(3001, () => {
    console.log("server running at 3001");
});

// Hide credentials from public repository
let mdb_password = process.env.MDB_PASSWORD;
let db_name = process.env.DB_NAME;

// Connect to DB
mongoose
    .connect("mongodb+srv://bestestcscc09group:" + mdb_password + "@cluster0.ykdmy.mongodb.net/" + db_name + "?retryWrites=true&w=majority")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(err));