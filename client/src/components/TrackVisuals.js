import { React } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import PieContainer from './PieContainer';

ChartJS.register(ArcElement, Tooltip, Legend);

const TrackVisuals = ({tracks}) => {
    let tracks_per_year = {}
    let popularity = {
      'Very Popular': 0,
      'Popular': 0,
      'Unpopular': 0,
      'Very Unpopular': 0
    }
    tracks.forEach((track) => {
      if (tracks_per_year[track.release_year + "s"] != null) {
        tracks_per_year[track.release_year + "s"] += 1
      } else {
        tracks_per_year[track.release_year + "s"] = 1
      }

      if (track.popularity >= 75) {
        popularity['Very Popular'] += 1
      } else if (track.popularity >= 50) {
        popularity['Popular'] += 1
      } else if (track.popularity >= 25) {
        popularity['Unpopular'] += 1
      } else {
        popularity['Very Unpopular'] += 1
      } 
    })
    const year_data = {
      labels: Object.keys(tracks_per_year),
      datasets: [
        {
          label: '# of Tracks',
          data: Object.values(tracks_per_year),
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
    };
    
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

    return (
        <div className='d-flex flex-row flex-wrap justify-content-center'>
          <PieContainer title="Years" data={year_data}></PieContainer>
          <PieContainer title="Popularity (Tracks)" data={popularity_data}></PieContainer>
        </div>
    );
}

export default TrackVisuals;