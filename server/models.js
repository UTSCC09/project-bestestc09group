const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordPathSchema = new Schema({
    starting_record: {type: Schema.Types.ObjectId, ref: 'Record'},
    name: {type: Schema.Types.String},
    user: {type: Schema.Types.String},
    count: {type: Number},
    likes: [{type: Schema.Types.String }],
    dislikes: [{type: Schema.Types.String }]
}, {timestamps: true })

function convertToFloat(val) {
    return parseFloat(val.toString());
}

const tuningFloatSchema = new Schema({
    max: {type: Schema.Types.Decimal128, get: convertToFloat},
    min: {type: Schema.Types.Decimal128, get: convertToFloat},
    target: {type: Schema.Types.Decimal128, get: convertToFloat}
})

const tuningIntSchema = new Schema({
    max: Number,
    min: Number,
    target: Number
})

const tuningSchema = new Schema({
    acousticness: tuningFloatSchema,
    danceability: tuningFloatSchema,
    duration_ms: tuningIntSchema,
    energy: tuningFloatSchema,
    instrumentalness: tuningFloatSchema,
    key: tuningIntSchema,
    liveness: tuningFloatSchema,
    loudness: tuningFloatSchema,
    mode: tuningIntSchema,
    popularity: tuningIntSchema,
    speechiness: tuningFloatSchema,
    tempo: tuningFloatSchema,
    time_signature: tuningIntSchema,
    valence: tuningFloatSchema,
})

const recordSchema = new Schema({
    next: [{type: Schema.Types.ObjectId, ref: 'Record'}],
    previous: { type: Schema.Types.ObjectId },
    tuning: tuningSchema,
    recommendations: { type: Schema.Types.ObjectId, ref: 'Playlist'},
    rp_id: { type: Schema.Types.ObjectId, ref: 'RecordPath'}
})

const playlistSchema = new Schema({
    tracks: [{ type: Schema.Types.String }]
});

exports.Record = mongoose.models.Record || mongoose.model('Record', recordSchema);
exports.RecordPath = mongoose.models.RecordPath || mongoose.model('RecordPath', recordPathSchema);
exports.Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema);