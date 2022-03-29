import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieContainer = ({title, data}) => {
    return (
        <div className='w-50 m-2 text-center'>
            <h1>{title}</h1>
            <Pie className='' data={data} options={{
                radius: '100%',
                plugins: {
                    legend: {
                        maxWidth: 200,
                        maxHeight: 300,
                        align: 'center',
                        position: 'top',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    }
                }
            }}></Pie>
        </div>
    );
}

export default PieContainer;