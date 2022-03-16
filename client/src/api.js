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
    
    // Mongo Routes
    // Get All Users in DB
    module.getAllUsersMongo = function(callback) {
        send("POST", `http://localhost:3001/graphql?query={
            allUsers {
                _id 
                username
                initial_records
            }
        }`, null, callback);
    }

    // Get User by Username
    module.getUserMongo = function(username, callback) {
        send("POST", `http://localhost:3001/graphql?query={
            users(username: "${username}") {
                _id 
                username
                initial_records
            }
        }`, null, callback);
    }

    // Get Playlist by ID
    module.getPlaylistMongo = function(id, callback) {
        send("POST", `http://localhost:3001/graphql?query={
            playlist(_id: "${id}") {
                _id 
                tracks
            }
        }`, null, callback);
    }

    // Get tracks in playlist with id
    module.getPlaylistTracksMongo = function(id, callback) {
        send("POST", `http://localhost:3001/graphql?query={
            allTracksInPlaylist(_id: "${id}") {
              _id
              url
              name
              artist
            }
        }`, null, callback);
    }

    // Get track by id
    module.getTrackMongo = function(id, callback) {
        send("POST", `http://localhost:3001/graphql?query={
            tracks(_id: "${id}") {
              _id
              url
              name
              artist
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

    // Add User
    module.newUserMongo = function(username, callback) {
        send("POST", `http://localhost:3001/graphql?query=mutation {
            addUser(username: "${username}") {
                _id
                username
                initial_records
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

    // Add Track
    module.newTrackMongo = function(url, name, artist, callback) {
        const url_query = encodeURIComponent(`mutation {
            addTrack(url: "${url}", name: "${name}", artist: "${artist}") {
                _id
                url
                name
                artist
            }
        }`)
        send("POST", "http://localhost:3001/graphql?query=" + url_query, null, callback);
    }

    // Add record
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