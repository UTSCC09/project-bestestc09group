import React, { useEffect } from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';

const Track = ({data}) => {
    let addedTrack = false;
    function showPlayer() {
        const body = document.querySelector('#body' + data.id);
        // console.log(data.id);
        if (body.className == 'collapse-show') {
            body.className = 'collapse';
        } else {
            if (!addedTrack) {
                addedTrack = true;
                const iframe = document.createElement('iframe');
                iframe.src = "https://open.spotify.com/embed/track/" + data.id;
                iframe.width = '100%';
                iframe.height = 80;
                iframe.className = 'd-block'

                body.prepend(iframe)
            }
            body.className = 'collapse-show'
        }
    }

    return (
        <Container className='mb-3'>
            <Card>
                <Card.Header onClick={showPlayer}>
                    <div className='row'>
                        <div className='col'>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>
                                {data.artists.map((artist) => {
                                    return artist.name  
                                }).join(', ')}
                            </Card.Text>
                        </div>
                        <div className='col d-flex align-items-center justify-content-end'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body id={"body" + data.id} className='collapse'>

                </Card.Body>
            </Card>
{/*             
            <div className='accordion' id={'parent' + data.id}>
                <Card>
                    <Card.Header id={'header' + data.id}>
                        <div className='row'>
                            <div className='col'>
                                <Card.Title>{data.name}</Card.Title>
                                <Card.Text>{data.artists.map((artist) => {
                                    return artist.name;
                                }).join(',')}</Card.Text>
                            </div>
                            
                            <div className='col d-flex align-items-center justify-content-end'>
                                <button class="btn" type='button' data-toggle='collapse' data-target={'#collapse' + data.id} aria-expanded='true' aria-controls={'collapse' + data.id}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </Card.Header>
                    <div id={'collapse' + data.id} className='collapse show' aria-labelledby={'header' + data.id} data-parent={'parent' + data.id}>
                        <Card.Body>
                            <iframe src={"https://open.spotify.com/embed/track/" + data.id} width="80" height="80" frameBorder="0"></iframe>
                        </Card.Body>
                    </div>
                    
                </Card>
            </div> */}
        </Container>
    );
}

export default Track;
