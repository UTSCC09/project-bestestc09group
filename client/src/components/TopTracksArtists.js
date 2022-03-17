import {useState, useEffect, React} from 'react';

/* ----- Styling ----- */
import Container from 'react-bootstrap/Container';
import TopContainer from './TopContainer';
import { api } from '../api';

const TopTracksArtists = () => {
    const [top_tracks, setTopTracks] = useState(null);
    const [top_artists, setTopArtists] = useState(null);

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        api.getUserTopTracks((err, data) => {
            if (err) {
                return
            }

            const track_data = data.map((track) => {
                return {
                    title: track.name,
                    url: track.external_urls.spotify,
                    artist: track.artists.map((artist) => {
                        return artist.name;
                    }).join(', ')
                }
            })

            let tracks_element = <TopContainer title="Top Tracks" tracks={track_data} artists={[]}></TopContainer>
            setTopTracks(tracks_element)

            api.getUserTopArtists((err, artists) => {
                if (err) {
                    return;
                }

                console.log(artists[0])
                const artist_data = artists.map((artist) => {
                    return {
                        name: artist.name,
                        url: artist.external_urls.spotify
                    }
                })

                let artist_element = <TopContainer class="mt-3" title="Top Artists" tracks={[]} artists={artist_data}></TopContainer>
                setTopArtists(artist_element)
            })
       })
    }

    return (
        <Container fluid>
            {top_tracks}
            {top_artists}
        </Container>
    );
}

export default TopTracksArtists;
