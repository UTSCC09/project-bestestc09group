import React, { useState, useEffect } from 'react';
import { api } from '../api';

/* ----- Styling ----- */
import Track from './Track';

const Playlist = ({tracks, rp_id}) => {

    const [likes, setLikes] = useState([]);
    const [dislikes, setDislikes] = useState([]);


    // On mount
    useEffect(() => {
        api.getRPTracks(rp_id, (error, tracks) => {
            if (error) return;
            setLikes(tracks.data.tracks.likes);
            setDislikes(tracks.data.tracks.dislikes);
        });
    }, []);

    function isLiked(id) {
        return likes.includes(id);
    }

    function isDisliked(id) {
        return dislikes.includes(id);
    }

    return (
        <div className='container-fluid mb-3 mt-3'>
            {/* <h3>Like up to 5 songs below and edit the tuning to generate recommendations.</h3> */}
            {tracks.map((track) => (
                <Track key={track.name + "-" + track.artists[0].name} data={track} liked={isLiked(track.id)} disliked={isDisliked(track.id)} rp_id={rp_id}/>
            ))}
        </div>
    );
}

export default Playlist;
