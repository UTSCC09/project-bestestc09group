import {React, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PieContainer from './PieContainer';

ChartJS.register(ArcElement, Tooltip, Legend);

const Artist_Visuals = ({artists}) => {
    const genres = {};
    let popularity = {
        'Very Popular': 0,
        'Popular': 0,
        'Unpopular': 0,
        'Very Unpopular': 0
    }

    console.log(artists);

    artists.forEach((artist) => {
        artist.genres.forEach((genre) => {
            if (genres[genre] != null) {
                genres[genre] += 1
            } else {
                genres[genre] = 1
            }
        })

        if (artist.popularity >= 75) {
            popularity['Very Popular'] += 1
        } else if (artist.popularity >= 50) {
            popularity['Popular'] += 1
        } else if (artist.popularity >= 25) {
            popularity['Unpopular'] += 1
        } else {
            popularity['Very Unpopular'] += 1
        } 
    })

    console.log('genres')
    console.log(genres);

    let background_colors = []
    let border_colors = []

    Object.keys(genres).forEach((genre) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);

        background_colors.push("rgba(" + r + "," + g + "," + b + ", 0.6)")
        border_colors.push("rgba(" + r + "," + g + "," + b + ", 1)")
    })

    const genre_data = {
        labels: Object.keys(genres),
        datasets: [
            {
                label: 'Genres',
                data: Object.values(genres),
                backgroundColor: background_colors,
                borderColor: border_colors,
                borderWidth: 1
            }
        ]
    }

    const popularity_data = {
        labels: Object.keys(popularity),
        datasets: [
          {
            label: 'Popularity',
            data: Object.values(popularity),
            backgroundColor: [
              'rgba(38, 84, 124, 0.6)',
              'rgba(239, 71, 111, 0.6)',
              'rgba(255, 209, 102, 0.6)',
              'rgba(6, 214, 160, 0.6)',
            ],
            borderColor: [
              'rgba(38, 84, 124, 1)',
              'rgba(239, 71, 111, 1)',
              'rgba(255, 209, 102, 1)',
              'rgba(6, 214, 160, 1)',
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
            <PieContainer title="Genres" data={genre_data}></PieContainer>
            <PieContainer title="Popularity (Artists)" data={popularity_data}></PieContainer>
        </div>
    );
}

export default Artist_Visuals;