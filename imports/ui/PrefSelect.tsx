import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Checkbox } from './components/Checkbox';
import { PrefsCollection } from '../api/PrefsCollection';

export const PrefSelect = () => {

  const prefData = useTracker(() => PrefsCollection.find({}).fetch());

  console.log(prefData);

  return (
    <>
    <div>
      <p>都道府県</p>
    </div>
    <div>
      {
        prefData.map(data => <Checkbox key={ data._id } data={ data } />)
      }
    </div>
    </>
  );
};
