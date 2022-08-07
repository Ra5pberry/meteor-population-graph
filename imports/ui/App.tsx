import React from 'react';
import { PrefSelect } from './PrefSelect';
import { PopulationGraph } from './PopulationGraph';

export const App = () => (
  <div className='wrapper'>
    <div className='select'>
      <PrefSelect />
    </div>
    <div className='graph'>
      <PopulationGraph />
    </div>
  </div>
);
