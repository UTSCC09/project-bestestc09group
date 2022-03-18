import React, { useEffect } from 'react';

/* ----- Styling ----- */
import Track from './Track';

const Playlist = ({title, tracks}) => {
    return (
        <div className='container-fluid mb-3'>
            <div className='d-flex flex-column text-center'>
                <h1>{title}</h1>
            </div>
            {/* <h3>Like up to 5 songs below and edit the tuning to generate recommendations.</h3> */}
            {tracks.map((track) => (
                <Track key={track.name} data={track} />
            ))}
        </div>
    );
}

export default Playlist;
