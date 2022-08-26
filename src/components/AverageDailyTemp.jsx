import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { ContentContainer } from '../theme/containers'
import { Colors } from '../config/colors'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const AverageDailyTemp = ({ forecast }) => {

  const dates = []
  const maxTemps = []
  const minTemps = []
  const avgTemps = []

  const fahrenheit = useSelector((state) => state.weatherState.fahrenheit)

  forecast?.forEach((days) => {
    dates.push(new Date(days.date).toLocaleDateString())
    maxTemps.push(fahrenheit ? days?.day.maxtemp_f : days.day.maxtemp_c)
    avgTemps.push(fahrenheit ? days.day.avgtemp_f : days.day.avgtemp_c)
    minTemps.push(fahrenheit ? days.day.mintemp_f : days.day.mintemp_c)
  })

  const tempData = {
    labels: dates,
    datasets: [
      {
        label: 'High',
        data: maxTemps,
        backgroundColor: Colors.red,
        borderColor: Colors.red,
        borderWidth: 5,
      },
      {
        label: 'Low',
        data: minTemps,
        backgroundColor: Colors.blue,
        borderColor: Colors.blue,
        borderWidth: 5,
      },
      {
        label: 'Average',
        data: avgTemps,
        backgroundColor: Colors.text,
        borderColor: Colors.text,
        borderWidth: 5,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <ContentContainer>
      <Typography variant='h6'> {`Average Daily Temperature ${fahrenheit ? '°F' : '°C'}`} </Typography>
      <Line style={{ marginTop: '1rem' }} options={options} data={tempData} />
    </ContentContainer>
  )
}

export default AverageDailyTemp