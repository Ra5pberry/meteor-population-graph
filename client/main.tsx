import React from 'react';
import { Meteor } from 'meteor/meteor';

import { render } from 'react-dom';
import { PrefSelect } from '/imports/ui/PrefSelect';
import { PopulationGraph } from '/imports/ui/PopulationGraph';

selectedPrefs = [];
datasets = [];

Meteor.startup(() => {
  render(<PrefSelect />, document.getElementById('select-target'));
});

const btnEle = document.getElementById('re-render');
btnEle.onclick = (e) => {
  console.log('pressed');
  Meteor.call('getPopulation', selectedPrefs, (error, result) => {
    console.log(result);
    console.log('pope');
    datasets = result;
    render(<PopulationGraph />, document.getElementById('graph-target'));
  });
}