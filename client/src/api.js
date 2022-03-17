let api = (function () { 
    function send(method, url, data, callback){
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }

    let module = {}

    // Get Playlist by ID
    module.getPlaylistMongo = function(id, callback) {
        send("POST", `http://localhost:3001/graphql?query={
            playlist(_id: "${id}") {
                _id 
                tracks
            }
        }`, null, callback);
    }

    // Get records by ids
    module.getRecordsMongo = function(ids, callback) {
        ids = ids.map((id) => {
            return `"${id}"`
        }).join(',');
        send("POST", `http://localhost:3001/graphql?query={
            records(ids: [${ids}]) {
                _id
                previous
                tuning
                recommendations
            }
        }`, null, callback);
    }

    // Get record path by starting record ids
    module.getRecordPathsMongo = function(user_id, callback) {
        send("POST", `http://localhost:3001/graphql?query={
            recordPaths(user: "${user_id}") {
                _id
                name
                user
                starting_record
                likes
                dislikes
                updatedAt
            }
        }`, null, callback);
    }

    // Add Playlist
    module.newPlaylistMongo = function(ids, callback) {
        ids = ids.map((id) => {
            return `"${id}"`
        }).join(',');
        send("POST", `http://localhost:3001/graphql?query=mutation {
            addPlaylist(tracks: [${ids}]) {
                _id
                tracks
            }
        }`, null, callback);
    }

    // Add Record
    module.newRecordMongo = function(previous, tuning, recommendations, callback) {
        send("POST", `http://localhost:3001/graphql?query=mutation {
            addRecord(previous: "${previous}", tuning: "${tuning}", recommendations: "${recommendations}") {
                _id
                next
                previous
                tuning
                recommendations
            }
        }`, null, callback);
    }

    module.newStartingRecordMongo = function(playlist, callback) {
        send("POST", `http://localhost:3001/graphql?query=mutation {
            addRecord (recommendations: "${playlist}") {
                _id
            }
        }`, null, callback);
    }

    // Add Record Path
    module.newRecordPathMongo = function(starting_record, name, user_id, callback) {
        send("POST", `http://localhost:3001/graphql?query=mutation {
            addRecordPath(starting_record: "${starting_record}", name: "${name}", user:"${user_id}") {
                _id
                name
                starting_record
                likes
                dislikes
            }
        }`, null, callback);
    }

    // Add Tuning
    module.newTuningMongo = function(tuning_info, callback) {
        const parameters = Object.keys(tuning_info).map((field) => {
            return field + ": " + JSON.stringify(tuning_info[field]).replaceAll('"', "");
        }).join(',');

        console.log(parameters);
        send("POST", `http://localhost:3001/graphql?query=mutation {
            addTuning(${parameters}) {
                _id
                acousticness {
                    min
                    max
                    target
                  }
                  danceability {
                    min
                    max
                    target
                  }
                  duration_ms {
                    min
                    max
                    target
                  }
                  energy {
                    min
                    max
                    target
                  }
                  instrumentalness {
                    min
                    max
                    target
                  }
                  key {
                    min
                    max
                    target
                  }
                  liveness {
                    min
                    max
                    target
                  }
                  loudness {
                    min
                    max
                    target
                  }
                  mode {
                    min
                    max
                    target
                  }
                  popularity {
                    min
                    max
                    target
                  }
                  speechiness {
                    min
                    max
                    target
                  }
                  tempo {
                    min
                    max
                    target
                  }
                  time_signature {
                    min
                    max
                    target
                  }
                  valence {
                    min
                    max
                    target
                  }
            }
        }`, null, callback);
    }

    // Update Record Next
    module.updateRecordNextMongo = function(id, next, callback) {
        send("POST", `http://localhost:3001/graphql?query=mutation {
            updateRecordNext(_id:"${id}" ,next: "${next}") {
                _id
                next
                previous
                tuning
                recommendations
            }
        }`, null, callback);
    }

    module.getClientInfo = function(callback) {
        send("GET", "http://localhost:3001/api/client_info", null, callback);
    }

    // Spotify Routes

    module.getUserInfo = function(callback) {
        send("GET", "http://localhost:3001/api/user" + "?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getRecommendations = function(queryString, callback) {
        send("GET", "http://localhost:3001/api/recommendations" + "?access_token=" + sessionStorage.getItem('access_token') + "&" + queryString, null, callback);
    }

    module.getPlaylistInfo = function(playlist_id, callback) {
        send("GET", "http://localhost:3001/api/playlists/" + playlist_id + "?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getUserPlaylists = function(callback) {
        send("GET", "http://localhost:3001/api/playlists?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getUserTopTracks = function(callback) {
        send("GET", "http://localhost:3001/api/top_tracks?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getUserTopArtists = function(callback) {
        send("GET", "http://localhost:3001/api/top_artists?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    return module;
})();

export {api};