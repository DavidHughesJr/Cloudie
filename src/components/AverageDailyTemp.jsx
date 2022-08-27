import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Typography, Stack } from '@mui/material'
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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const AverageDailyTemp = ({ forecast }) => {

  const dates = []
  const hourlyTemps = []
  const dayTemps = []
  const weatherHours = []
  const weatherDays = []

  const fahrenheit = useSelector((state) => state.weatherState.fahrenheit)
  const combine48Hours = forecast ? [...forecast?.[0].hour, ...forecast?.[1].hour] : ''

  combine48Hours.forEach((hour) => {
    hourlyTemps.push(fahrenheit ? hour?.temp_f : hour?.temp_c)
    weatherHours.push(new Date(hour.date).toLocaleDateString())
  })

  forecast?.forEach((days) => {
    weatherDays.push(new Date(days.date).toLocaleDateString())
    dayTemps.push(fahrenheit ? days?.day.maxtemp_f : days.day.maxtemp_c)

  })

  const tempData = {
    labels: hourlyTemps,
    datasets: [
      {
        label: 'High',
        data: hourlyTemps,
        backgroundColor: Colors.red,
        borderColor: Colors.red,
        borderWidth: 5,
      },
    ],
  }

  const options = {
    scales: {
      yAxis: {
        display: false,
      },
      xAxis: {
        offset: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          data: ''
        }
      },
      xAxis2: {
        offset: true,
        grid: {
          drawBorder: false,
          display: false,
        },
        position: "top",
        ticks: {
          data: ''
        }
        },
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        display: true,
        color: "black",
        align: 'top'
      }
    },
  };

  return (
    <ContentContainer>
      <Stack direction="row" spacing={2} >
        <Typography variant='h6' > {`Average Daily Temperature ${fahrenheit ? '°F' : '°C'}`} </Typography>
        <Button variant="outlined">Outlined</Button>
      </Stack>
  
      <Line style={{ marginTop: '1rem' }} options={options} data={tempData} plugins={[ChartDataLabels]} />
    </ContentContainer>
  )
}

export default AverageDailyTemp