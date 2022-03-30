import {useState, useEffect, React} from 'react';

/* ----- Styling ----- */
import TopContainer from './TopContainer';
import { api } from '../api';

const TopTracksArtists = () => {
    const [top_tracks, setTopTracks] = useState(null);
    const [top_artists, setTopArtists] = useState(null);

    useEffect(() => {
        getTracks();
    }, [])

    function getArtists() {
        api.getUserTopArtists((err, artists) => {
            if (err) {
                return;
            }

            console.log(artists[0])
            const artist_data = artists.map((artist) => {
                return {
                    name: artist.name,
                    url: artist.external_urls.spotify,
                    image: artist.images[1].url,
                    genres: artist.genres,
                    id: artist.id,
                    popularity: artist.popularity
                }
            })

            let artist_element = <TopContainer className="mt-3" title="Top Artists" tracks={[]} artists={artist_data}></TopContainer>
            setTopArtists(artist_element)
        })
    }

    function getTracks() {
        api.getUserTopTracks((err, data) => {
            if (err) {
                return
            }

            console.log(data);

            const track_data = data.map((track) => {
                return {
                    title: track.name,
                    url: track.external_urls.spotify,
                    artist: track.artists.map((artist) => {
                        return artist.name;
                    }).join(', '),
                    id: track.id,
                    release_year: track.album.release_date.substring(0,3) + '0',
                    popularity: track.popularity
                }
            })

            let tracks_element = <TopContainer title="Top Tracks" tracks={track_data} artists={[]}></TopContainer>
            setTopTracks(tracks_element)
       })
    }

    function toggleList(e) {
        if (e.target.innerText == "View Top Artists") {
            e.target.innerText = "View Top Tracks";
            setTopTracks(null)
            getArtists();
        } else {
            e.target.innerText = "View Top Artists";
            setTopArtists(null)
            getTracks();
        }
    }

    return (
        <div className='container-fluid mt-3'>
            <div className='d-flex justify-content-center mb-2'>
                <button className='btn w-25 btn-primary' onClick={toggleList}>View Top Artists</button>
            </div>
            {top_tracks}
            {top_artists}
        </div>
    );
}

export default TopTracksArtists;
