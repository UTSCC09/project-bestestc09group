const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    next: [{type: Schema.Types.ObjectId, ref: 'Record'}],
    previous: { type: Schema.Types.ObjectId },
    tuning: { type: Schema.Types.ObjectId, ref: 'Tuning' },
    recommendations: { type: Schema.Types.ObjectId, ref: 'Playlist'}
})

const recordPathSchema = new Schema({
    starting_record: {type: Schema.Types.ObjectId, ref: 'Record'},
    likes: [{type: Schema.Types.ObjectId, ref: 'Track'}],
    dislikes: [{type: Schema.Types.ObjectId, ref: 'Track'}]
})

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

const trackSchema = new Schema({
    url: { type: String, required: true},
    name: { type: String, required: true },
    artist: { type: String, required: true }
});

const playlistSchema = new Schema({
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track'}]
});

const userSchema = new Schema({
    username: String,
    initial_records: [{type: Schema.Types.ObjectId, ref: 'RecordPath'}]
});


exports.Tuning = mongoose.models.Tuning || mongoose.model("Tuning", tuningSchema);
exports.Record = mongoose.models.Record || mongoose.model('Record', recordSchema);
exports.RecordPath = mongoose.models.RecordPath || mongoose.model('RecordPath', recordPathSchema);
exports.Track = mongoose.models.Track || mongoose.model('Track', trackSchema);
exports.Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema); 
exports.User = mongoose.models.User || mongoose.model('User', userSchema);