const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require('./schema').schema;
const request = require('request');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const axios = require('axios');

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
const { User, Playlist, Track, Record, Tuning } = require("./models");

var app = express();

app.use(cors())
    .use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))
    .use(express.json())
    .use(cookieParser())
    .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {httpOnly: true, secure: true, sameSite: true}
}));

app.listen(process.env.PORT, () => {
    console.log("server running at " + process.env.PORT);
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

/*

{
    seed_tracks: 1,2,3,4,5,6,7,8,9,10
}
=>
[
    {
        seed_tracks: 1,2,3,4,5
    },
    {
        seed_tracks: 6,7,8,9,10
    }
]
*/

function make_query_without_access_token(json) {
    console.log(json.seed_tracks);
    const seed_track_split = json.seed_tracks.split(',');
    let new_seed_tracks = []
    for (let i = 0; i < seed_track_split.length; i = i + 5) {
        new_seed_tracks.push(seed_track_split.slice(i,5+i).join(','));
    }

    // console.log(new_seed_tracks);

    let rec_reqs = new_seed_tracks.map((seed_track) => {
        return Object.keys(json).map((key) => {
            if (key === 'access_token') {
                return null;
            } else if (key == "seed_tracks") {
                return key + "=" + encodeURIComponent(seed_track);
            } else {
                return key + "=" + encodeURIComponent(json[key]);
            }
        }).join('&');
    })

    console.log(rec_reqs);
    return rec_reqs;
}

// Spotify API Calls
// Get Recommendations 
app.get('/api/recommendations', (req, res) => {
    let queries = make_query_without_access_token(req.query);
    let recommendation_requests = queries.map((query) => {
        return axios.get('https://api.spotify.com/v1/recommendations?' + query.substring(1), {
            headers: {
                Authorization: ('Bearer ' + req.query.access_token)
            }
        });
    })

    axios.all(recommendation_requests)
        .then(axios.spread((...responses) => {
            console.log(responses);
            const recommendation_data = responses.map((response) => {
                return response.data;
            })
            res.status(200).json(recommendation_data);
        }))
        .catch((error) => {
            console.log(error);
            res.status(500).end("uh oh");
        })
})
    // axios.get('https://api.spotify.com/v1/recommendations?' + make_query_without_access_token(req.query).substring(1), {
    //     headers: {
    //         Authorization: ('Bearer ' + req.query.access_token)
    //     }
    // }).then((response) => {
    //     // console.log(response.data);
    //     res.status(200).json(response.data)
    // }).catch((error) => {
    //     // console.log(error);
    //     res.status(500).end(error)
    // })

// Get Playlist Info
app.get('/api/playlists/:id', (req, res) => {
    axios.get('https://api.spotify.com/v1/playlists/' + req.params.id, {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response.data);
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get Users Playlists
app.get('/api/playlists', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/playlists', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.items)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error.statusText)
    })
})

// Get users top tracks
app.get('/api/top_tracks', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.items)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

app.get('/api/tracks', (req, res) => {
    if (req.query.ids === undefined || req.query.ids == 0)
        res.status(400).end();
    axios.get('https://api.spotify.com/v1/tracks?ids=' + req.query.ids, {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.tracks)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

app.get('/api/artists', (req, res) => {
    axios.get('https://api.spotify.com/v1/artists?ids=' + req.query.ids, {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.artists)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get users top artists
app.get('/api/top_artists', (req, res) => {
    axios.get('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data.items)
    }).catch((error) => {
        console.log(error);
        res.status(500).end(error)
    })
})

// Get current user profile
app.get('/api/user', (req, res) => {
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: ('Bearer ' + req.query.access_token)
        }
    }).then((response) => {
        console.log(response);
        res.status(200).json(response.data)
    }).catch((error) => {
        console.log(error);
        res.status(error.response.status).end(error.response.statusText);
    })
})

// Connect to DB
mongoose
    .connect("mongodb+srv://bestestcscc09group:" + mdb_password + "@cluster0.ykdmy.mongodb.net/" + db_name + "?retryWrites=true&w=majority")
    .then(() => console.log("Connected to database..."))
    .catch(err => console.log(err));