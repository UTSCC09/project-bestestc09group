import React from 'react';
import TopArtistCard from './TopArtistCard';
import TopTrackCard from './TopTrackCard';

const TopContainer = ({title, tracks, artists}) => {
    return (
        <div class='d-flex flex-column'>
            <h1 class='text-center fw-bolder'>{title}</h1>
            {tracks.length > 0 ? tracks.map((track) => (
                <TopTrackCard data={track} />
            )) : artists.map((artist) => (
                <TopArtistCard data={artist} />
            ))}
        </div>
    );
}

export default TopContainer;