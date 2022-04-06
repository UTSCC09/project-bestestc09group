import React, { useEffect, useContext } from 'react';
import { RecordContext } from "./RecordPath";

/* ----- Styling ----- */
import Track from './Track';

const Playlist = ({tracks}) => {

    return (
        <div className='container-fluid mb-3 mt-3'>
            {/* <h3>Like up to 5 songs below and edit the tuning to generate recommendations.</h3> */}
            {tracks.map((track) => (
                <Track key={track.name} data={track} />
            ))}
        </div>
    );
}

export default Playlist;
