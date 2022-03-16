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
    GraphQLInputObjectType,
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
        next: { type: new GraphQLList(GraphQLID) },
        previous: { type: GraphQLID },
        tuning: { type: GraphQLID },
        recommendations: { type: GraphQLID }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        _id: { type: GraphQLID },
        username: { type: GraphQLString },
        initial_records: { type: new GraphQLList(GraphQLID) }
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
        tracks: { type: new GraphQLList(GraphQLID) }
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

const TuningFloatTypeInput = new GraphQLInputObjectType({
    name: 'TuningFloatInput',
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

const TuningIntTypeInput = new GraphQLInputObjectType({
    name: 'TuningIntInput',
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
                const result = user.save()
                    .then(doc => {
                        console.log(doc);
                        return doc;
                    })
                    .catch(err => {
                        console.log(err);
                    })
                
                return result;
            }
        },
        addPlaylist: {
            type: PlaylistType,
            args: {
                tracks: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args) {
                let playlist = new Playlist({
                    tracks: args.tracks
                })
                const result = playlist.save()
                    .then(doc => {
                        return doc
                    })
                    .catch(err => {
                        console.log(err)
                    })
                
                    return result
            }
        },
        addTrack: {
            type: TrackType,
            args: {
                url: { type: GraphQLString },
                name: { type: GraphQLString },
                artist: { type: GraphQLString }
            },
            resolve(parent, args) {
                let track = new Track({
                    url: args.url,
                    name: args.name,
                    artist: args.artist
                })

                const result = track.save()
                    .then(doc => {
                        return doc
                    })
                    .catch(err => {
                        console.log(err);
                    })

                return result
            }
        },
        addRecord: {
            type: RecordType,
            args: {
                next: { type: new GraphQLList(GraphQLID) },
                previous: { type: GraphQLID },
                tuning: { type: GraphQLID },
                recommendations: { type: GraphQLID }
            },
            resolve(parent, args) {
                let record = new Record({
                    next: args.next,
                    previous: args.previous,
                    tuning: args.tuning,
                    recommendations: args.recommendations
                })

                const result = record.save()
                    .then(doc => {
                        return doc
                    })
                    .catch(err => {
                        console.log(err);
                    })

                return result
            }
        },
        addTuning: {
            type: TuningType,
            args: {
                acousticness: { type: TuningFloatTypeInput },
                danceability: { type: TuningFloatTypeInput },
                duration_ms: { type: TuningIntTypeInput },
                energy: { type: TuningFloatTypeInput },
                instrumentalness: { type: TuningFloatTypeInput },
                key: { type: TuningIntTypeInput },
                liveness: { type: TuningFloatTypeInput },
                loudness: { type: TuningFloatTypeInput },
                mode: { type: TuningIntTypeInput },
                popularity: { type: TuningIntTypeInput },
                speechiness: { type: TuningFloatTypeInput },
                tempo: { type: TuningFloatTypeInput },
                time_signature: { type: TuningIntTypeInput },
                valence: { type: TuningFloatTypeInput }
            },
            resolve(parent, args) {
                let tuning = new Tuning({
                    acousticness: args.acousticness,
                    danceability: args.danceability,
                    duration_ms: args.duration_ms,
                    energy: args.energy,
                    instrumentalness: args.instrumentalness,
                    key: args.key,
                    liveness: args.liveness,
                    loudness: args.loudness,
                    mode: args.mode,
                    popularity: args.popularity,
                    speechiness: args.speechiness,
                    tempo: args.tempo,
                    time_signature: args.time_signature,
                    valence: args.valence,
                })

                const result = tuning.save()
                    .then(doc => {
                        return doc
                    })
                    .catch(err => {
                        console.log(err);
                    })

                return result
            }
        },
        updateRecordNext: {
            type: RecordType,
            args: {
                _id: {type: GraphQLID},
                next: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Record.findByIdAndUpdate(args._id, {"$push": {"next": args.next}}, {lean: true})
                    .then((doc) => {
                        console.log(doc);
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                return result;
            }
        },
        updateUserRecords: {
            type: UserType,
            args: {
                username: {type: GraphQLString},
                new_record: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = User.findOneAndUpdate({username: args.username}, {"$push": {"initial_records": args.new_record}}, {lean: true})
                    .then((doc) => {
                        console.log(doc);
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                return result;
            }
        }

        
    }
});

/* ----- Queries ------- */

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        allUsers: {
            type: new GraphQLList(UserType),
            args: {},
            resolve(parent, args) {
                const result = User.find({})
                    .then((arr) => {
                        console.log(arr);
                        return arr
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                
                return result;
            }
        },
        users: {
            type: UserType,
            args: {
                username: { type: GraphQLString }
            },
            resolve(parent, args) {
                const result = User.findOne({username: args.username})
                    .then((arr) => {
                        console.log(arr);
                        return arr
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                
                return result;
            }
        },
        playlists: {
            type: PlaylistType,
            args: {
                _id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Playlist.findOne({_id: args._id})
                    .then((arr) => {
                        console.log(arr);
                        return arr
                    })
                    .catch((err) => {
                        // console.log(err);
                    })
                return result;
            }
        },
        tunings: {
            type: TuningType,
            args: {
                _id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Tuning.findOne({_id: args._id})
                    .then((arr) => {
                        return arr
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                return result;
            }
        },
        records: {
            type: new GraphQLList(RecordType),
            args: {
                ids: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args) {
                const result = Record.find({_id: {$in: args.ids}})
                    .then((arr) => {
                        console.log(arr);
                        return arr;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                return result;
            }
        },
        allTracksInPlaylist: {
            type: new GraphQLList(TrackType),
            args: {
                _id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Track.find({_id: {$in: args._id}})
                    .then((arr) => {
                        console.log(arr);
                        return arr
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                return result;
            }
        },
        tracks: {
            type: TrackType,
            args: {
                _id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Track.findOne({_id: args._id})
                    .then((arr) => {
                        console.log(arr);
                        return arr
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                return result;
            }
        }
    }
});


exports.schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
