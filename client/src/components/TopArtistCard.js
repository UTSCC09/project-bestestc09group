import React from 'react';

const TopArtistCard = ({data}) => {
    return (
        <div class='card p-2 mb-3'>
            <div class='container-fluid p-0'>
                <div class='row'>
                    <div class='col'>
                            <h3 class='fw-bold'>{data.name}</h3>
                    </div>
                    <div class='col d-flex justify-content-end'>
                        <a href={data.url} class='btn btn-primary'>View on Spotify</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopArtistCard;