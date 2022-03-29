import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieContainer = ({title, data}) => {
    return (
        <div className='text-center'>
            <h1>{title}</h1>
            <Pie data={data} options={{plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                }
            }}}></Pie>
        </div>
    );
}

export default PieContainer;