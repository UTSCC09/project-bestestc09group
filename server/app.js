const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require('graphql');
const mongoose = require("mongoose");
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

require("dotenv").config();

const cookie = require('cookie');
var cors = require("cors");

// TODO: decide to store list of Records or just ids
var schema = buildSchema(`
    type Query {
        hello: String
    },
    type Tuning {
        max_acousticness: Float,
        max_danceability: Float,
        max_duration_ms: Int,
        max_energy: Float,
        max_instrumentalness: Float,
        max_key: Int,
        max_liveness: Float,
        max_loudness: Float,
        max_mode: Int,
        max_popularity: Int,
        max_speechiness: Float,
        max_tempo: Float,
        max_time_signature: Int,
        max_valence: Float,
        min_acousticness: Float,
        min_danceability: Float,
        min_duration_ms: Int,
        min_energy: Float,
        min_instrumentalness: Float,
        min_key: Int,
        min_liveness: Float,
        min_loudness: Float,
        min_mode: Int,
        min_popularity: Int,
        min_speechiness: Float,
        min_tempo: Float,
        min_time_signature: Int,
        min_valence: Float,
        target_acousticness: Float,
        target_danceability: Float,
        target_duration_ms: Int,
        target_energy: Float,
        target_instrumentalness: Float,
        target_key: Int,
        target_liveness: Float,
        target_loudness: Float,
        target_mode: Int,
        target_popularity: Int,
        target_speechiness: Float,
        target_tempo: Float,
        target_time_signature: Int,
        target_valence: Float
    },
    type Track {
        id: ID!,
        url: String!,
        name: String!,
        artist: String!
    },
    type User {
        id: ID!,
        username: String,
        refresh_token: String,
        initial_records: [ID!]
    },
    type Record {
        id: ID!,
        next: [ID],
        previous: ID,
        tuning: Tuning!,
        tracks: [Track]
    }
`);

var root = {
    hello: () => {
        return 'Hello World!';
    },
}

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))
    .use(cors())
    .use(cookieParser())
    .use(session({
    secret: 'ytmp3',
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