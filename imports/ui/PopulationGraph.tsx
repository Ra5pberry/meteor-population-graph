import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '人口推移',
    },
  },
};

export const PopulationGraph = () => {

  const labels: string[] = [
    "1960",
    "1965",
    "1970",
    "1975",
    "1980",
    "1985",
    "1990",
    "1995",
    "2000",
    "2005",
    "2010",
    "2015",
    "2020",
    "2025",
    "2030",
    "2035",
    "2040",
    "2045",
  ];

  let data = {
    labels,
    datasets: datasets,
  };

  return (
    <>
    <div className='population-graph'>
      <Line options={options} data={data} />
    </div>
    </>
  );
}