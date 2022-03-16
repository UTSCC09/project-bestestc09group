import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Track from './Track';

const tracks = [{title: "test1", artist:"test1", url:"http:test"},{title: "test2", artist:"test2", url:"http:test"}]

const Playlist = () => {
    return (
        <Container fluid>
            {tracks.map((track) => (
                <Track data={track} />
            ))}
        </Container>
    );
}

export default Playlist;
