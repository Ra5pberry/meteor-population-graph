import React, { useState } from 'react';
import { PopulationCollection } from '/imports/api/PopulationCollection';
import { PrefsCollection } from '/imports/api/PrefsCollection';

import axios from '/plugins/axios';

export const Checkbox = ({ prefData }) => {

  const handleChecked = e => {

    if (e.target.checked) {
      console.log(PrefsCollection.findOne({_id: prefData._id}));
      PrefsCollection.update({_id: prefData._id}, {
        $set: {
          isChecked: true,
        }
      });
      axios
      .get('/api/v1/population/composition/perYear', {
        params: {
          prefCode: prefData.prefCode,
          cityCode: '-',
        },
      })
      .then((res) => {
        for (const [key, data] of Object.entries(res.data.result)) {
          if (Array.isArray(data)) {
            data[0].data.forEach((data) => {
              var doc = PopulationCollection.findOne({prefId: prefData._id, year: data.year});
              if (!doc) {
                PopulationCollection.insert({
                  prefId: prefData._id,
                  prefName: prefData.prefName,
                  population: data.value,
                  year: data.year,
                  visible: true,
                });
              }
              else {
                PopulationCollection.update({_id: doc._id }, {
                  $set: {
                    population: data.value,
                    visible: true,
                  }
                });
              }
            });
          }
        }
      })
    }
    else {
      console.log('un-checked!');
      PrefsCollection.update({_id: prefData._id}, {
        $set: {
          isChecked: false,
        }
      });
      PopulationCollection.find({prefId: prefData._id}).forEach((data) => {
        PopulationCollection.update(data._id, {
          $set: {
            visible: false,
          }
        });
      });
    }
  }

  return (
    <div className='pref-select'>
      <input
        type="checkbox"
        value={prefData.prefCode}
        id={prefData.prefCode}
        onChange={handleChecked}
        checked={prefData.isChecked}
        className='pref-checkbox'
      />
      <label htmlFor={prefData.prefCode} className='pref-label'>{prefData.prefName}</label>
    </div>
  )
}