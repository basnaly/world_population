import React from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

const options = {
  
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'Bar Chart'
    },
    indexAxis: 'y',
    scales: {
        x: {
          display: true,
          type: 'logarithmic', 
        },
        y: {
          display: true,
          ticks: {
            autoSkip: false
          },
        }
    }
}

const ChartPopulation = (props) => {

    const chartData = {
        labels: props.data.map(el => el.country),
        datasets: [
            {
                barThickness: 6,
                label: 'World population',
                data: props.data.map(el => el.population),
                backgroundColor: props.data.map((el, i) => `hsl(${(i/ 244*360)}, 50%, 50%)`)
            }
        ]
    }

    return (
        <div className=" d-flex flex-column p-2 align-self-stretch" 
            style={{height:'3000px'}}>
            <Chart type='bar' data={ chartData } options={ options } 
            className='chart'/>
        </div>    
    )
}

export default ChartPopulation;