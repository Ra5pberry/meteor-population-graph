import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Checkbox } from './components/Checkbox';
import { PrefsCollection } from '../api/PrefsCollection';

export const PrefSelect = () => {

  const prefData = useTracker(() => PrefsCollection.find({}).fetch());

  return (
    <>
    <div className='div-header'>
      <p>都道府県</p>
    </div>
    <div className='select-wrapper'>
      {
        prefData.map(data => <Checkbox key={ data._id } prefData={ data } />)
      }
    </div>
    </>
  );
};
