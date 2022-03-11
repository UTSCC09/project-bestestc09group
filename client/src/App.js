import React, { useState, useEffect } from 'react';
import Buffer from "Buffer";
import {api} from './api';
import './App.css';

/* ----- Styling ----- */
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './theme.scss';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

function App() { 
  const TOKEN = "https://accounts.spotify.com/api/token";
  const [top_track, setTopTrack] = useState(0)
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
    const scope = 'user-read-private user-read-email user-top-read';
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
      setTopTrack(tracks[0].name);
    })
  }

  return (
    <Container fluid className="p-0">
      <Navbar bg="light">
        <Container fluid>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Nav className="justify-content-between container-fluid">
              <Navbar.Brand>DiscoverWeeklyU</Navbar.Brand>
              <Button variant="primary" onClick={handleAuthorization}>Log in with Spotify</Button>
            </Nav>
        </Container>
      </Navbar>
      <Button variant="secondary" onClick={getInfo}>Get User Info</Button>
      <h1>Top Track: {top_track}</h1>
    </Container>
  );
}

export default App;
