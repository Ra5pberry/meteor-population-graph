import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
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
import { PopulationCollection } from '../api/PopulationCollection';
import { PrefsCollection } from '../api/PrefsCollection';

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


  const populationDataChange = useTracker(() => PopulationCollection.find({}).fetch());

  let datasets = [];
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

  PrefsCollection.find({ isChecked: true }).forEach((prefData) => {
    var colorSet = `${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}`;
    var dataset = {
      label: prefData.prefName,
      data: [0],
      borderColor: `rgb(${colorSet})`,
      backgroundColor: `rgb(${colorSet}, 0.5)`
    };
    var data: number[] = [];
    PopulationCollection.find({ prefId: prefData._id }, { sort: { year: 1 } }).forEach((populationData) => {
      data.push(populationData.population);
    });
    dataset.data = data;
    datasets.push(dataset);
  });

  let data = {
    labels,
    datasets: datasets,
  };

  console.log(data);
  console.log(options);

  return (
    <>
    <div className='population-graph'>
      <Line options={options} data={data} />
    </div>
    </>
  );
}