const defaultTuning = {
    acousticness: {min: 0, max: 1, target: 0.5},
    danceability: {min: 0, max: 1, target: 0.5},
    duration_ms: {min: 0, max: 600000, target: 300000},
    energy: {min: 0, max: 1, target: 0.5},
    instrumentalness: {min: 0, max: 1, target: 0.5},
    key: {min: 0, max: 11, target: 6},
    liveness: {min: 0, max: 1, target: 0.5},
    loudness: {min: 0, max: 11, target: 6},
    mode: {min: 0, max: 1, target: 1},
    popularity: {min: 0, max: 100, target: 50},
    speechiness: {min: 0, max: 1, target: 0.5},
    tempo: {min: 0, max: 300, target: 150},
    time_signature: {min: 0, max: 11, target: 6},
    valence: {min: 0, max: 1, target: 0.5}
}

export default defaultTuning;