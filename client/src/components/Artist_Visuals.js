import {React, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TrackPie from './PieContainer';

ChartJS.register(ArcElement, Tooltip, Legend);

const Artist_Visuals = ({artists}) => {
    const genres = {};

    console.log(artists);
    artists.forEach((artist) => {
        artist.genres.forEach((genre) => {
            if (genres[genre] != null) {
                genres[genre] += 1
            } else {
                genres[genre] = 1
            }
        })
    })

    console.log('genres')
    console.log(genres);

    const genre_data = {
        labels: Object.keys(genres),
        datasets: [
            {
                label: 'Genres',
                data: Object.values(genres),
                backgroundColor: [
                    'rgba(38, 84, 124, 0.6)',
                    'rgba(239, 71, 111, 0.6)',
                    'rgba(255, 209, 102, 0.6)',
                    'rgba(6, 214, 160, 0.6)',
                    'rgba(106, 1, 54, 0.6)',
                    'rgba(247, 5, 49, 0.6)',
                ],
                borderColor: [
                    'rgba(38, 84, 124, 1)',
                    'rgba(239, 71, 111, 1)',
                    'rgba(255, 209, 102, 1)',
                    'rgba(6, 214, 160, 1)',
                    'rgba(106, 1, 54, 1)',
                    'rgba(247, 5, 49, 1)',
                ],
                borderWidth: 1
            }
        ]
    }

    // const year_data = {
    //   labels: Object.keys(tracks_per_year),
    //   datasets: [
    //     {
    //       label: '# of Tracks',
    //       data: Object.values(tracks_per_year),
    //       backgroundColor: [
    //         'rgba(38, 84, 124, 0.6)',
    //         'rgba(239, 71, 111, 0.6)',
    //         'rgba(255, 209, 102, 0.6)',
    //         'rgba(6, 214, 160, 0.6)',
    //         'rgba(106, 1, 54, 0.6)',
    //         'rgba(247, 5, 49, 0.6)',
    //       ],
    //       borderColor: [
    //         'rgba(38, 84, 124, 1)',
    //         'rgba(239, 71, 111, 1)',
    //         'rgba(255, 209, 102, 1)',
    //         'rgba(6, 214, 160, 1)',
    //         'rgba(106, 1, 54, 1)',
    //         'rgba(247, 5, 49, 1)',
    //       ],
    //       borderWidth: 1
    //     }
    //   ] 
    // }

    return (
        <div className='d-flex justify-content-center'>
            <TrackPie title="Genres" data={genre_data}></TrackPie>
        </div>
    );
}

export default Artist_Visuals;