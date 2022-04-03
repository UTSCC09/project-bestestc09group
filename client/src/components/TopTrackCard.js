import React from 'react';
import Card from 'react-bootstrap/Card';

const TopTrackCard = ({data}) => {
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

                body.prepend(iframe)
            }
            body.className = 'collapse-show'
        }
    }

    return (
        <div className='container-fluid mb-3'>
            <Card>
                <Card.Header onClick={showPlayer}>
                    <div className='row'>
                        <div className='col'>
                            <Card.Title>{data.title}</Card.Title>
                            <Card.Text>
                                {data.artist}
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
        </div>
        // <div className='card p-2 mb-3'>
        //     <div className='container-fluid'>
        //         <div className='row'>
        //             {/* <div className='col-auto'>
        //                 <iframe src={"https://open.spotify.com/embed/track/" + data.id} width="80" height="80" frameBorder="0"></iframe>
        //             </div> */}
        //             <div className='col'>
        //                 <h3 className='fw-bold'>{data.title}</h3>
        //                 <h5>{data.artist}</h5>
        //             </div>
        //             <div className='col d-flex align-items-center justify-content-end'>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
        //                 <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        //             </svg>
        //                 {/* <a href={data.url} className='btn btn-primary d-flex align-items-center' target="_blank" rel="noopener noreferrer">Play on Spotify</a> */}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default TopTrackCard;