const graphql = require('graphql');
const models = require('./models');
const Track = models.Track;
const Playlist = models.Playlist;
const Record = models.Record;
const Tuning = models.Tuning;
const User = models.User;
const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLFloat, 
    GraphQLString,
    GraphQLList
} = graphql;

/* ----- Types --------- */

const RecordType = new GraphQLObjectType({
    name: 'Record',
    fields: () => ({
        _id: { type: GraphQLID },
        next: { type: new GraphQLList(RecordType) },
        previous: { type: RecordType },
        tuning: { type: TuningType },
        recommendations: { type: new GraphQLList(TrackType) }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        initial_records: { type: new GraphQLList(RecordType) }
    })
});

const TrackType = new GraphQLObjectType({
    name: 'Track',
    fields: () => ({
        _id: { type: GraphQLID },
        url: { type: GraphQLString },
        name: { type: GraphQLString },
        artist: { type: GraphQLString }
    })
});

const PlaylistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: () => ({
        _id: { type: GraphQLID },
        tracks: { type: new GraphQLList(TrackType) }
    })
});

const TuningFloatType = new GraphQLObjectType({
    name: 'TuningFloat',
    fields: () => ({
        min: { type: GraphQLFloat },
        max: { type: GraphQLFloat },
        target: { type: GraphQLFloat }
    })
});

const TuningIntType = new GraphQLObjectType({
    name: 'TuningInt',
    fields: () => ({
        min: { type: GraphQLInt },
        max: { type: GraphQLInt },
        target: { type: GraphQLInt }
    })
});

const TuningType = new GraphQLObjectType({
    name: 'Tuning',
    fields: () => ({
        _id: { type: GraphQLID },
        acousticness: { type: TuningFloatType },
        danceability: { type: TuningFloatType },
        duration_ms: { type: TuningIntType },
        energy: { type: TuningFloatType },
        instrumentalness: { type: TuningFloatType },
        key: { type: TuningIntType },
        liveness: { type: TuningFloatType },
        loudness: { type: TuningFloatType },
        mode: { type: TuningIntType },
        popularity: { type: TuningIntType },
        speechiness: { type: TuningFloatType },
        tempo: { type: TuningFloatType },
        time_signature: { type: TuningIntType },
        valence: { type: TuningFloatType },
    })
});

/* ----- Mutations ----- */

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                username: { type: GraphQLString },
            },
            resolve(parent, args) {
                let user = new User({
                    username: args.username,
                    initial_records: []
                })
                user.save()
                    .then(doc => {
                        console.log(doc);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }
});

/* ----- Queries ------- */

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        playlists: {
            type: GraphQLString,
            args: { },
            resolve(parent, args) {
                return "TODO: not implemented"
            }
        }
    }
});


exports.schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
