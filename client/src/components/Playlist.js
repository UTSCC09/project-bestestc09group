import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Track from './Track';

const Playlist = ({title, tracks}) => {
    return (
        <Container fluid>
            <h1>{title}</h1>
            {tracks.map((track) => (
                <Track key={track.title} data={track} />
            ))}
        </Container>
    );
}

export default Playlist;
