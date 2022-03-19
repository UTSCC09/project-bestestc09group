import React, { useEffect, useContext } from 'react';
import { RecordContext } from "./RecordPath";

/* ----- Styling ----- */
import Track from './Track';

const Playlist = ({title}) => {
    const tracks = useContext(RecordContext).tracks;

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
