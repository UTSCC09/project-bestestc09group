const graphql = require('graphql');
const models = require('./models');
const Playlist = models.Playlist;
const Record = models.Record;
const RecordPath = models.RecordPath;
const Tuning = models.Tuning;
const { 
    GraphQLSchema, 
    GraphQLObjectType, 
    GraphQLInputObjectType,
    GraphQLScalarType,
    GraphQLID, 
    GraphQLInt, 
    GraphQLFloat, 
    GraphQLString,
    GraphQLList
} = graphql;

/* ----- Types --------- */

const defaultTuning = {
    acousticness: {min: 0.0, max: 1.0, target: 0.5},
    danceability: {min: 0.0, max: 1.0, target: 0.5},
    duration_ms: {min: 0, max: 600000, target: 300000},
    energy: {min: 0.0, max: 1.0, target: 0.5},
    instrumentalness: {min: 0.0, max: 1.0, target: 0.5},
    key: {min: 0, max: 11, target: 6},
    liveness: {min: 0.0, max: 1.0, target: 0.5},
    loudness: {min: -70, max: 0, target: -25}, 
    mode: {min: 0, max: 1, target: 1},
    popularity: {min: 0, max: 100, target: 50},
    speechiness: {min: 0.0, max: 1.0, target: 0.5},
    tempo: {min: 0, max: 300, target: 120},
    time_signature: {min: 3, max: 7, target: 4},
    valence: {min: 0.0, max: 1.0, target: 0.5}
}

const TrackType = new GraphQLObjectType({
    name: 'Track',
    fields: () => ({
        likes: { type: new GraphQLList(GraphQLString) },
        dislikes: { type: new GraphQLList(GraphQLString) }
    })
});

const RecordType = new GraphQLObjectType({
    name: 'Record',
    fields: () => ({
        _id: { type: GraphQLID },
        next: { type: new GraphQLList(GraphQLID) },
        previous: { type: GraphQLID },
        tuning: { type: TuningType },
        recommendations: { type: GraphQLID },
        rp_id: { type: GraphQLID }
    })
});

const DateType = new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },    
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return new Date(ast.value) // ast value is always in string format
        }
        return null;
      },
  })

const RecordPathType = new GraphQLObjectType({
    name: 'RecordPath',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        user: { type: GraphQLString },
        count: {type: GraphQLInt },
        starting_record: { type: GraphQLID},
        likes: { type: new GraphQLList(GraphQLID) },
        dislikes: { type: new GraphQLList(GraphQLID) },
        updatedAt: { type: DateType }
    })
})

const PlaylistType = new GraphQLObjectType({
    name: 'Playlist',
    fields: () => ({
        _id: { type: GraphQLID },
        tracks: { type: new GraphQLList(GraphQLString) }
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

const TuningInputType = new GraphQLInputObjectType({
    name: 'TuningInput',
    fields: () => ({
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
        valence: { type: TuningFloatTypeInput },
    })
});

/* ----- Mutations ----- */

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPlaylist: {
            type: PlaylistType,
            args: {
                tracks: {type: new GraphQLList(GraphQLString)}
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
        addRecord: {
            type: RecordType,
            args: {
                next: { type: new GraphQLList(GraphQLID) },
                previous: { type: GraphQLID },
                tuning: { type: TuningInputType },
                recommendations: { type: GraphQLID },
                rp_id: { type: GraphQLID}
            },
            resolve(parent, args) {
                let tuning = args.tuning === undefined? defaultTuning : args.tuning;
                let record = new Record({
                    next: args.next,
                    previous: args.previous,
                    tuning: tuning,
                    rp_id: args.rp_id,
                    recommendations: args.recommendations
                })

                const result = record.save()
                    .then(doc => {
                        console.log(doc);
                        return doc
                    })
                    .catch(err => {
                        console.log(err);
                    })

                return result
            }
        },
        addRecordPath: {
            type: RecordPathType,
            args: {
                starting_record: { type: GraphQLID },
                name: { type: GraphQLString },
                user: { type: GraphQLString }
            },
            resolve(parent, args) {
                const rp_response = RecordPath.findOne({name: args.name, user: args.user})
                    .then(doc => {
                        if (doc) {
                            console.log("Already Exists!");
                            return {
                                errors: ["Name already exists"]
                            }
                        }

                        let recordPath = new RecordPath({
                            starting_record: args.starting_record,
                            name: args.name,
                            user: args.user,
                            count: 1,
                            likes: [],
                            dislikes: []
                        });
        
                        const result = recordPath.save()
                            .then(doc => {
                                return doc
                            })
                            .catch(err => {
                                console.log(err);
                            })
        
                        return result
                    })
                    .catch(err => {
                        console.log(err);
                        
                    });
                
                return rp_response;
            }

        },
        addLikedTrack: {
            type: RecordPathType,
            args: {
                record_path: {type: GraphQLID},
                track: {type: GraphQLString }
            },
            resolve(parent, args) {
                const result = RecordPath.findByIdAndUpdate(args.record_path, {"$addToSet": {"likes": args.track}, "$pull": {"dislikes":args.track}}, {lean: true, returnDocument: "after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return result;
            }
        },
        addDislikedTrack: {
            type: RecordPathType,
            args: {
                record_path: {type: GraphQLID},
                track: {type: GraphQLString }
            },
            resolve(parent, args) {
                const result = RecordPath.findByIdAndUpdate(args.record_path, {"$addToSet": {"dislikes": args.track}, "$pull": {"likes":args.track}}, {lean: true, returnDocument: "after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return result;
            }
        },
        removeLikedTrack: {
            type: RecordPathType,
            args: {
                record_path: {type: GraphQLID},
                track: {type: GraphQLString }
            },
            resolve(parent, args) {
                const result = RecordPath.findByIdAndUpdate(args.record_path, {"$pull": {"likes": args.track}}, {lean: true, returnDocument: "after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return result;
            }
        },
        removeDislikedTrack: {
            type: RecordPathType,
            args: {
                record_path: {type: GraphQLID},
                track: {type: GraphQLString }
            },
            resolve(parent, args) {
                const result = RecordPath.findByIdAndUpdate(args.record_path, {"$pull": {"dislikes": args.track}}, {lean: true, returnDocument: "after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return result;
            }
        },
        updateRecordNext: {
            type: RecordType,
            args: {
                _id: {type: GraphQLID},
                next: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Record.findByIdAndUpdate(args._id, {"$push": {"next": args.next}}, {lean: true, returnDocument:"after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                return result;
            }
        },
        updateRecordParent: {
            type: RecordType,
            args: {
                _id: {type: GraphQLID},
                parent_id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Record.findByIdAndUpdate(args._id, {rp_id: args.parent_id}, {lean: true, returnDocument:"after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                return result;
            }
        },
        updateRecordPathCount: {
            type: RecordPathType,
            args: {
                _id: {type: GraphQLID},
                incrementBy: {type: GraphQLInt}
            },
            resolve(parent, args) {
                const result = RecordPath.findByIdAndUpdate(args._id, {$inc: {count: args.incrementBy}}, {lean: true, returnDocument:"after"})
                    .then((doc) => {
                        return doc;
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                return result;
            }
        },
        deleteRecordPath: {
            type: RecordPathType,
            args: {
                _id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = RecordPath.findByIdAndDelete({_id: args._id})
                    .then((path) => {
                        Record.find({rp_id: path._id})
                            .then((doc) => {
                                console.log(doc);

                                const playlists_to_delete = doc.map((record) => {
                                    return record.recommendations;
                                })

                                Playlist.deleteMany({_id: {$in: playlists_to_delete}})
                                    .then((ok, deletedCount, n) => {
                                        console.log(deletedCount);
                                        
                                        Record.deleteMany({rp_id: path._id})
                                            .then((ok, deletedCount, n) => {
                                                return deletedCount;
                                            })
                                    })
                            })
                        return path
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return result;
                
            }
        }
    }
});

/* ----- Queries ------- */

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        playlists: {
            type: PlaylistType,
            args: {
                _id: {type: GraphQLID}
            },
            resolve(parent, args) {
                const result = Playlist.findOne({_id: args._id})
                    .then((arr) => {
                        return arr;
                    })
                    .catch((err) => {
                        // console.log(err);
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
                        return arr;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                return result;
            }
        },
        recordsInRP: {
            type: new GraphQLList(RecordType),
            args: {
                rp_id: {type: new GraphQLList(GraphQLID)}
            },
            resolve(parent, args) {
                const result = Record.find({rp_id: args.rp_id})
                    .then((arr) => {
                        return arr;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                return result;
            }
        },
        recordPaths: {
            type: new GraphQLList(RecordPathType),
            args: {
                user: {type: GraphQLString}
            },
            resolve(parent, args) {
                const result = RecordPath.find({user: args.user})
                    .then((arr) => {
                        return arr;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                return result;
            }
        },
        recordPath: {
            type: RecordPathType,
            args: {
                rp_id: { type: GraphQLID }
            },
            resolve(parent, args) {
                const result = RecordPath.findOne({_id: args.rp_id})
                    .then((doc) => {
                        return doc;
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
                record_path: { type: GraphQLID }
            },
            resolve(parent, args) {
                const result = RecordPath.findOne({_id: args.record_path})
                    .then((doc)=>{
                        const tracks = { likes: doc.likes, dislikes: doc.dislikes};
                        console.log(tracks);
                        return tracks;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                return result;
            }
        }
    }
});


exports.schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
