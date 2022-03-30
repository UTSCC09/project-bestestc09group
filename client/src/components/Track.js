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
                    <div className='col-auto'>
                        <iframe src={"https://open.spotify.com/embed/track/" + data.id} width="80" height="80" frameBorder="0"></iframe>
                    </div>
                    <div className='col'>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>{data.artists.map((artist) => {
                            return artist.name;
                        }).join(',')}</Card.Text>
                    </div>
                    {/* <Button className='me-2'>Like</Button> */}
                    {/* <Button>Dislike</Button> */}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Track;
