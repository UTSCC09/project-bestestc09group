import React, { useState, useEffect } from 'react';
import {api} from './api';
import './App.css';

function App() { 
  const TOKEN = "https://accounts.spotify.com/api/token";
  const [top_tracks, setTopTrack] = useState(0);
  const [top_artists, setTopArtists] = useState(0);
  let client_id = '';
  let client_secret = '';
  let access_token = null;
  let refresh_token = null;


  useEffect( () => {
    client_id = sessionStorage.getItem('client_id');
    client_secret = sessionStorage.getItem('client_secret');

    if (window.location.search.length > 0) {
      handleRedirect();
    } else {
      console.log('hi');
    }
  }, []);

  function handleRedirect() {
    let code = getCode();
    getAccessToken(code);
    window.history.pushState("", "", "http://localhost:3000/");
  }

  function getAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI("http://localhost:3000/");
    body += "&client_id=" + client_id;
    body += "&client_secret=" + client_secret;
    callAuthorizationApi(body);
  }

  function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ":" + client_secret));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
  }

  function handleAuthorizationResponse(){
    if ( this.status == 200 ){
        var data = JSON.parse(this.responseText);
        // console.log(data);
        var data = JSON.parse(this.responseText);
        if ( data.access_token != undefined ){
            access_token = data.access_token;
            sessionStorage.setItem("access_token", access_token);
        }
        if ( data.refresh_token  != undefined ){
            refresh_token = data.refresh_token;
            sessionStorage.setItem("refresh_token", refresh_token);
        }
        window.location.reload();
    }
    else {
        console.log(this.responseText);
        alert(this.responseText);
    }
}

  function getCode() {
    let code = null;
    let queryString = window.location.search;
    let searchParams = new URLSearchParams(queryString);
    if (searchParams.get('state') && searchParams.get('state') === sessionStorage.getItem('state')) {
      code = searchParams.get('code');
    }

    return code;
  }

  function generateRandomState(length) {
    var state = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      state += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return state;
  }
  
  function jsonToQuery(json) {
    return Object.keys(json).map((key) => {
      return key + "=" + json[key];
    }).join('&');
  }

  function handleAuthorization() {
    const scope = 'user-read-private user-read-email user-top-read playlist-read-collaborative playlist-read-private';
    api.getClientInfo((error, client_info) => {
      client_id = client_info.id;
      client_secret = client_info.secret;
      sessionStorage.setItem('client_id', client_id);
      sessionStorage.setItem('client_secret', client_secret);

      const authorization_options = {
        client_id: client_id,
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/',
        state: generateRandomState(16),
        scope: scope,
      }

      sessionStorage.setItem('state', authorization_options.state);
      window.location.href = ('https://accounts.spotify.com/authorize?' + jsonToQuery(authorization_options))
    })
  }

  function getInfo() {
    api.getUserTopTracks((error, tracks) => {
      let track_list = document.querySelector('#top_tracks');
      tracks.map((track) => {
        let list_item = document.createElement('li');
        list_item.innerText = track.name;
        track_list.appendChild(list_item);
      })

      api.getUserTopArtists((error, artists) => {
        let artist_list = document.querySelector('#top_artists');
        artists.map((artist) => {
          let list_item = document.createElement('li');
          list_item.innerText = artist.name;
          artist_list.appendChild(list_item);
        })
      });
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleAuthorization}>Authorize with Spotify</button>
        <button onClick={getInfo}>Get User Info</button>
        <h1>Top Tracks</h1>
        <ul id='top_tracks'>
        </ul>
        <h1>Top Artists</h1>
        <ul id='top_artists'>
        </ul>
      </header>
    </div>
  );
}

export default App;
