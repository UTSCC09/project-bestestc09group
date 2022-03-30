import React from 'react';

const TopArtistCard = ({data}) => {
    return (
        <div className='card p-2 mb-3'>
            <div className='container-fluid p-0'>
                <div className='row'>
                    <div className='col-auto'>
                    <iframe src={"https://open.spotify.com/embed/artist/" + data.id} width="80" height="80" frameBorder="0"></iframe>
                    </div>
                    <div className='col'>
                        <h3 className='fw-bold underline'>{data.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopArtistCard;