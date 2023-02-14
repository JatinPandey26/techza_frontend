import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from 'chart.js';

import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

export const LineChart = ({views = []}) => {
  const labels = getLastYearMonths();

  const options = {
    resposive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'views',
        data: views,
        borderColor: 'rgba(107,70,193)',
        backgroundColor: '#6b46c1',
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export const DoughnutChart = ({data}) => {
  const labels = ['Subscribed', 'Not subscribed'];

  const options = {
    resposive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Yearly Views',
      },
    },
  };

  const dataset = {
    labels,
    datasets: [
      {
        label: 'views',
        data,
        borderColor: ['rgba(62,12,171)', 'rgba(214,43,129)'],
        backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut options={options} data={dataset} />;
};

function getLastYearMonths() {
  let labels = [];

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currMonth = new Date().getMonth()
  console.log(currMonth);
  for(let i = 0 ; i <= 11 ; i++ ) {
    labels.unshift(months[(currMonth-i+12)%12]);
  }
  
  return labels

}

