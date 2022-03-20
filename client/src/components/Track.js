import React from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

const Track = ({data}) => {
    return (
        <Container className='mb-3'>
            <Card>
                <Card.Body className='row'>
                    <div className='col'>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>{data.artists.map((artist) => {
                            return artist.name;
                        }).join(',')}</Card.Text>
                    </div>
                    <div className='col d-flex justify-content-end'>
                        <a href={data.external_urls.spotify} className='btn btn-primary d-flex align-items-center' target="_blank" rel="noopener noreferrer">Play on Spotify</a>
                    </div>
                    {/* <Button className='me-2'>Like</Button> */}
                    {/* <Button>Dislike</Button> */}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Track;
