import React from 'react';
import TopArtistCard from './TopArtistCard';
import TopTrackCard from './TopTrackCard';

const TopContainer = ({title, tracks, artists}) => {
    return (
        <div className='d-flex flex-column'>
            <h1 className='text-center fw-bolder'>{title}</h1>
            {tracks.length > 0 ? tracks.map((track) => (
                <TopTrackCard key={track.id} data={track} />
            )) : artists.map((artist) => (
                <TopArtistCard key={artist.id} data={artist} />
            ))}
        </div>
    );
}

export default TopContainer;