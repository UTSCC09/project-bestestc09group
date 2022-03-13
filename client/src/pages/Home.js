import React from 'react';

/* ----- Bootstrap ----- */
import Button from 'react-bootstrap/Button';


const Home = ({ top_track, getInfo }) => {
    return (
        <div>
            <Button variant="secondary" onClick={getInfo}>Get User Info</Button>
            <h1>Top Track: {top_track}</h1>
        </div>
    );
}

export default Home;
