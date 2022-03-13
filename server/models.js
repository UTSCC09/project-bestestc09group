const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    next: { type: Array },
    previous: { type: Schema.Types.ObjectId },
    tuning: { type: Schema.Types.ObjectId, ref: 'Tuning' },
    playlist: { type: Schema.Types.ObjectId, ref: 'Playlist'}
})

const tuningSchema = new Schema({
    max_acousticness: Schema.Types.Decimal128,
    max_danceability: Schema.Types.Decimal128,
    max_duration_ms: Number,
    max_energy: Schema.Types.Decimal128,
    max_instrumentalness: Schema.Types.Decimal128,
    max_key: Number,
    max_liveness: Schema.Types.Decimal128,
    max_loudness: Schema.Types.Decimal128,
    max_mode: Number,
    max_popularity: Number,
    max_speechiness: Schema.Types.Decimal128,
    max_tempo: Schema.Types.Decimal128,
    max_time_signature: Number,
    max_valence: Schema.Types.Decimal128,
    min_acousticness: Schema.Types.Decimal128,
    min_danceability: Schema.Types.Decimal128,
    min_duration_ms: Number,
    min_energy: Schema.Types.Decimal128,
    min_instrumentalness: Schema.Types.Decimal128,
    min_key: Number,
    min_liveness: Schema.Types.Decimal128,
    min_loudness: Schema.Types.Decimal128,
    min_mode: Number,
    min_popularity: Number,
    min_speechiness: Schema.Types.Decimal128,
    min_tempo: Schema.Types.Decimal128,
    min_time_signature: Number,
    min_valence: Schema.Types.Decimal128,
    target_acousticness: Schema.Types.Decimal128,
    target_danceability: Schema.Types.Decimal128,
    target_duration_ms: Number,
    target_energy: Schema.Types.Decimal128,
    target_instrumentalness: Schema.Types.Decimal128,
    target_key: Number,
    target_liveness: Schema.Types.Decimal128,
    target_loudness: Schema.Types.Decimal128,
    target_mode: Number,
    target_popularity: Number,
    target_speechiness: Schema.Types.Decimal128,
    target_tempo: Schema.Types.Decimal128,
    target_time_signature: Number,
    target_valence: Schema.Types.Decimal128
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
    initial_records: [{type: Schema.Types.ObjectId, ref: 'Record'}]
});


exports.Tuning = mongoose.models.Tuning || mongoose.model("Tuning", tuningSchema);
exports.Record = mongoose.models.Record || mongoose.model('Record', recordSchema);
exports.Track = mongoose.models.Track || mongoose.model('Track', trackSchema);
exports.Playlist = mongoose.models.Playlist || mongoose.model('Playlist', playlistSchema); 
exports.User = mongoose.models.User || mongoose.model('User', userSchema);