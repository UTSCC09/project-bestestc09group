import React from 'react';

const TopArtistCard = ({data}) => {
    return (
        <div className='card p-2 mb-3'>
            <div className='container-fluid p-0'>
                <div className='row'>
                    <div className='col'>
                        <h3 className='fw-bold underline'>{data.name}</h3>
                    </div>
                    <div className='col d-flex justify-content-end'>
                        <a href={data.url} className='btn btn-primary d-flex align-items-center'>View on Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopArtistCard;