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
                    {/* <div className='col-auto bg-dark'>
                        <iframe src={"https://open.spotify.com/embed/track/" + data.id} width="80" height="80" frameBorder="0"></iframe>
                    </div> */}
                    <div className='col'>
                        <Card.Title>{data.name}</Card.Title>
                        <Card.Text>{data.artists.map((artist) => {
                            return artist.name;
                        }).join(',')}</Card.Text>
                    </div>
                    <div className='col d-flex align-items-center justify-content-end'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </div>
                    {/* <Button className='me-2'>Like</Button> */}
                    {/* <Button>Dislike</Button> */}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Track;
