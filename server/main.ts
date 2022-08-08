import { Meteor } from 'meteor/meteor';

import { PrefData } from '/common/Interfaces';

import { PopulationCollection } from '/imports/api/PopulationCollection';
import { PrefsCollection } from '/imports/api/PrefsCollection';

import axios from '/plugins/axios';

const insertPref = (prefData: PrefData, index: string) => PrefsCollection.insert({
  _id: index,
  prefCode: prefData.prefCode,
  prefName: prefData.prefName,
  isChecked: false,
});

const insertPopulation = (prefData, data) => PopulationCollection.insert({
  prefId: prefData._id,
  prefCode: prefData.prefCode,
  prefName: prefData.prefName,
  population: data.value,
  year: data.year,
});

Meteor.startup(() => {
  PrefsCollection.rawCollection().drop();
  PopulationCollection.rawCollection().drop();

  if (PrefsCollection.find().count() === 0) {
    axios
    .get('/api/v1/prefectures')
    .then((res) => {
      for (const [key, data] of Object.entries(res.data.result)) {
        insertPref(data as PrefData, key);
      }

      PrefsCollection.find().forEach((prefData) => {
        axios
        .get('/api/v1/population/composition/perYear', {
          params: {
            prefCode: prefData.prefCode,
            cityCode: '-',
          },
        })
        .then((res) => {
          for (const [key, val] of Object.entries(res.data.result)) {
            if (Array.isArray(val)) {
              val[0].data.forEach((data) => {
                insertPopulation(prefData, data);
              });
            }
          }
        })
      })
    })
    .catch((e) => {
      console.log(e);
    });
  }
});

Meteor.methods({
  getPopulation(prefs) {
    let res = [];
    prefs.forEach((prefCode) => {
      var colorSet = `${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}`;
      var dataset = {
        label: PrefsCollection.findOne({ prefCode: prefCode }).prefName,
        data: [0],
        borderColor: `rgb(${colorSet})`,
        backgroundColor: `rgb(${colorSet}, 0.5)`
      };
      var data: number[] = [];
      PopulationCollection.find({ prefCode: prefCode }, { sort: { year: 1 } }).forEach((populationData) => {
        data.push(populationData.population);
      });
      dataset.data = data;
      res.push(dataset);
    });

    return res;
  },
});
