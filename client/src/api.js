let server_url = process.env.REACT_APP_SERVER 

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
        send("POST", server_url + `/graphql?query={
            playlists (_id: "${id}") {
                _id 
                tracks
            }
        }`, null, callback);
    }

    module.getRecordsByRPID = function(rp_id, callback) {
        send("POST", server_url + `/graphql?query={
            recordsInRP(rp_id: "${rp_id}") {
                _id
                previous
                next
                tuning {
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
                recommendations
                rp_id
            }
        }`, null, callback);
    }

    // Get records by ids
    module.getRecordsMongo = function(ids, callback) {
        ids = ids.map((id) => {
            return `"${id}"`
        }).join(',');
        send("POST", server_url + `/graphql?query={
            records(ids: [${ids}]) {
                _id
                previous
                next
                tuning {
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
                recommendations
                rp_id
            }
        }`, null, callback);
    }

    // Get record paths by user ids
    module.getRecordPathsMongo = function(user_id, callback) {
        send("POST", server_url + `/graphql?query={
            recordPaths(user: "${user_id}") {
                _id
                name
                user
                count
                starting_record
                likes
                dislikes
                updatedAt
            }
        }`, null, callback);
    }

    // Get record path by id
    module.getRecordPathMongo = function(rp_id, callback) {
        send("POST", server_url + `/graphql?query={
            recordPath(rp_id: "${rp_id}") {
                _id
                name
                user
                count
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
        send("POST", server_url + `/graphql?query=mutation {
            addPlaylist(tracks: [${ids}]) {
                _id
                tracks
            }
        }`, null, callback);
    }

    // Add Record
    module.newRecordMongo = function(previous, tuning, recommendations, rp_id, callback) {
        const tuning_params = Object.keys(tuning).map((field) => {
            return field + ": " + JSON.stringify(tuning[field]).replaceAll('"', "");
        }).join(',');

        send("POST", server_url + `/graphql?query=mutation {
            addRecord(previous: "${previous}", tuning: {${tuning_params}}, recommendations: "${recommendations}", rp_id: "${rp_id}") {
                _id
                next
                previous
                tuning {
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
                recommendations
                rp_id
            }
        }`, null, callback);
    }

    module.newStartingRecordMongo = function(playlist, callback) {
        send("POST", server_url + `/graphql?query=mutation {
            addRecord (recommendations: "${playlist}") {
                _id
            }
        }`, null, callback);
    }

    // Add Record Path
    module.newRecordPathMongo = function(starting_record, name, user_id, callback) {
        send("POST", server_url + `/graphql?query=mutation {
            addRecordPath(starting_record: "${starting_record}", name: "${name}", user:"${user_id}") {
                _id
                name
                count
                starting_record
                likes
                dislikes
            }
        }`, null, callback);
    }

    module.deleteRecordPath = function(id, callback) {
        send("POST", server_url + `/graphql?query=mutation {
            deleteRecordPath(_id: "${id}") {
                _id
            }
        }`, null, callback);
    }

    // Update Record Next
    module.updateRecordNextMongo = function(id, next, callback) {
        send("POST", server_url + `/graphql?query=mutation {
            updateRecordNext(_id:"${id}" ,next: "${next}") {
                _id
                next
                previous
                tuning {
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
                recommendations
                rp_id
            }
        }`, null, callback);
    }

    // Update Record Next
    module.updateRecordParentMongo = function(id, parent_id, callback) {
        send("POST", server_url + `/graphql?query=mutation {
            updateRecordParent(_id:"${id}" ,parent_id: "${parent_id}") {
                _id
                next
                previous
                tuning {
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
                recommendations
                rp_id
            }
        }`, null, callback);
    }

    module.incrementRPCount = function(id, increment_by, callback) {
        send("POST", server_url + `/graphql?query=mutation {
            updateRecordPathCount(_id: "${id}", incrementBy: ${increment_by}) {
                _id
                name
                count
                starting_record
                likes
                dislikes
            }
        }`, null, callback);
    }

    module.getClientInfo = function(callback) {
        send("GET", server_url + "/api/client_info", null, callback);
    }

    // Spotify Routes
    module.getArtists = function(artist_ids, callback) {
        send("GET", server_url + "/api/artists?access_token=" + sessionStorage.getItem('access_token') + "&ids=" + artist_ids.join(','), null, callback);
    }

    module.getUserInfo = function(callback) {
        send("GET", server_url + "/api/user?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getRecommendations = function(queryString, callback) {
        send("GET", server_url + "/api/recommendations?access_token=" + sessionStorage.getItem('access_token') + "&" + queryString, null, callback);
    }

    module.getPlaylistInfo = function(playlist_id, callback) {
        send("GET", server_url + "/api/playlists/" + playlist_id + "?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getTracks = function(track_ids, callback) {
        send("GET", server_url + "/api/tracks?access_token=" + sessionStorage.getItem('access_token') + "&ids=" + track_ids.join(","), null, callback);
    }

    module.getUserPlaylists = function(callback) {
        send("GET", server_url + "/api/playlists?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getUserTopTracks = function(callback) {
        send("GET", server_url + "/api/top_tracks?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    module.getUserTopArtists = function(callback) {
        send("GET", server_url + "/api/top_artists?access_token=" + sessionStorage.getItem('access_token'), null, callback);
    }

    return module;
})();

export {api};