import { assertWrappingType } from 'graphql';
import React, { useState, useEffect } from 'react';
import {api} from './api';
import './App.css';

import { Route, Routes } from 'react-router-dom'

/* ----- Components ----- */
import Header from './components/Header';
import Auth from './components/Auth';
import Discover from './components/Discover';
import CreateRecordPath from './components/CreateRecordPath';

function App() { 
  const TOKEN = "https://accounts.spotify.com/api/token";
  const [recordPaths, setRecordPaths] = useState([]);
  const [auth, setAuth] = useState(isAuthorized());
  let client_id = '';
  let client_secret = '';
  let access_token = null;
  let refresh_token = null;


  useEffect( () => {
    if (window.location.search.length > 0) {
      api.getClientInfo((error, client_info) => {
        client_id = client_info.id;
        client_secret = client_info.secret;
        
        handleRedirect();
      })
    } else {
      console.log('hi');
    }
    isAuthorized();
    updateRoutes();
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

  function isAuthorized() {
    api.getUserInfo((error, data) => {
      if (error) {
        setAuth(false);
        return false;
      }
      setAuth(true);
      return true;
    });
  }

  function updateRoutes() {
    api.getUserInfo((error, user) => {
      if (error) {
        console.log(error);
        return;
      }
      api.getRecordPathsMongo(user.id, (error, paths) => {
        if (error) {
          console.log(error);
          return;
        }
        console.log(paths.data.recordPaths);
        setRecordPaths(paths.data.recordPaths);
      });
    });
  }

  return (
    <div className="App">
      <Header authHandler={handleAuthorization} auth={auth}/>
      <Routes>
        <Route path="/" element={<Auth auth={auth}/>}/>
        <Route path="/create" element={<CreateRecordPath/>}/>
        <Route path="/recordpath/:id" element={<Discover/>}/>
        {recordPaths.map((data) => (
          <Route key={data.name} path={"/recordpath/" + data.name} element={<Discover title={data.name}/>}/>
        ))}
      </Routes>
      {/* <button onClick={getInfo}>Get User Info</button>
        <h1>Top Tracks</h1>
        <ul id='top_tracks'>
        </ul>
        <h1>Top Artists</h1>
        <ul id='top_artists'>
        </ul> */}
    </div>
  );
}

export default App;
