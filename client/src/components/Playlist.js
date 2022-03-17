import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Track from './Track';

const fake_tracks = [{title: "test1", artist:"test1", url:"http:test"},{title: "test2", artist:"test2", url:"http:test"}]

const Playlist = ({title, tracks}) => {
    return (
        <Container fluid>
            <h1>{title}</h1>
            {fake_tracks.map((track) => (
                <Track data={track} />
            ))}
        </Container>
    );
}

export default Playlist;
