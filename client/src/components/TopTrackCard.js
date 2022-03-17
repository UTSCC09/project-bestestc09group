import React from 'react';

const TopTrackCard = ({data}) => {
    return (
        <div class='card p-2 mb-3'>
            <div class='container-fluid'>
                <div class='row'>
                    <div class='col'>
                        <h3 class='fw-bold'>{data.title}</h3>
                        <h5>{data.artist}</h5>
                    </div>
                    <div class='col d-flex justify-content-end'>
                        <a href={data.url} class='btn btn-primary d-flex align-items-center'>Play on Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopTrackCard;