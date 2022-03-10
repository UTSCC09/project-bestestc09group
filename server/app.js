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
let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI;


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var jsonToQuery = function(json) {
    return Object.keys(json).map((key) => {
        return key + "=" + json[key];
    }).join('&');
}

let stateKey = 'spotify_auth_state';

app.get('/', (req, res) => {
    res.send('hi')
})

app.get('/api/client_info', (req, res) => {
    return res.status(200).json({
        id: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET
    })
})

app.get('/login', (req, res) => {
    let state = generateRandomString(16);
    res.cookie(stateKey, state);
    console.log('hey')

    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read';
    res.redirect('https://accounts.spotify.com/authorize?' +
        jsonToQuery({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
})

app.get('/callback', function(req, res) {
    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    console.log('state: ' + state);
    console.log('storedState: ' + storedState);

    if (state === null || state !== storedState) {
        console.log('in if')
        res.redirect('/#' +
        jsonToQuery({
            error: 'state_mismatch'
        }));
    } else {
        console.log('in else')
        res.clearCookie(stateKey);
        var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
        };

        request.post(authOptions, function(error, response, body) {
            console.log(error);
            console.log(response.statusCode)
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                req.session.access_token = access_token;
                

                // var options = {
                // url: 'https://api.spotify.com/v1/me',
                // headers: { 'Authorization': 'Bearer ' + access_token },
                // json: true
                // };

                // // use the access token to access the Spotify Web API
                // request.get(options, function(error, response, body) {
                //     console.log(access_token)
                //     console.log(body);
                // });

                res.redirect('/');
            } else {
                res.redirect('/#' +
                jsonToQuery({
                    error: 'invalid_token'
                }));
            }
        });
    }
});

app.get('/top', (req, res) => {
    a_t = 'BQAYvK4Ol_veJBT_lmnfr7LGwcRbbWQCPGUiZMkjiQsKvK4g5DV_W6qBXU0lsb9i3yvwqH5UPnSv8UJh7M4YpFSIJ1VoGwTeqFtTotDacRLWC14wULHFVfg_C42m9akENW_V3bma0Vb20EKmXZjpTXC3fB-0xK0WM-YU0UDWYBuEQmevwXojocI';
    let options = {
        url: 'https://api.spotify.com/v1/me/top/tracks',
        headers: { 'Authorization': 'Bearer ' + a_t},
        json: true
    };

    // use the access token to access the Spotify Web API
    request.get(options, function(error, response, body) {
        console.log(body);
    });
})

app.get('/refresh_token', function(req, res) {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});

// Connect to DB
mongoose
    .connect("mongodb+srv://bestestcscc09group:" + mdb_password + "@cluster0.ykdmy.mongodb.net/" + db_name + "?retryWrites=true&w=majority")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(err));