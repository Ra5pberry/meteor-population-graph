import { Meteor } from 'meteor/meteor';
import { PrefData } from '/common/Interfaces';
import { PrefsCollection } from '/imports/api/PrefsCollection';
import axios from '/plugins/axios';

const insertPref = (prefData: PrefData, index: string) => PrefsCollection.insert({
  _id: index,
  prefCode: prefData.prefCode,
  prefName: prefData.prefName,
});

Meteor.startup(() => {
  if (PrefsCollection.find().count() === 0) {
    axios
    .get('/api/v1/prefectures')
    .then((res) => {
      for (const [key, data] of Object.entries(res.data.result)) {
        console.log(typeof(key));
        console.log(data);
        insertPref(data as PrefData, key);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  }
});
