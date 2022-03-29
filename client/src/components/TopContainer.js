import React from 'react';
import Artist_Visuals from './Artist_Visuals';
import TopArtistCard from './TopArtistCard';
import TopTrackCard from './TopTrackCard';
import Track_Visuals from './Track_Visuals';

const TopContainer = ({title, tracks, artists}) => {
    return (
        <div className='d-flex flex-column'>
            {
                tracks.length > 0 ? <Track_Visuals tracks={tracks}/> : <Artist_Visuals artists={artists}></Artist_Visuals>
            }
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