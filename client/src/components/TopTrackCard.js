import React from 'react';

const TopTrackCard = ({data}) => {
    return (
        <div className='card p-2 mb-3'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <h3 className='fw-bold'>{data.title}</h3>
                        <h5>{data.artist}</h5>
                    </div>
                    <div className='col d-flex justify-content-end'>
                        <a href={data.url} className='btn btn-primary d-flex align-items-center'>Play on Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopTrackCard;