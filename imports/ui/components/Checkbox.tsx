import React from 'react';

export const Checkbox = ({ prefData }) => {

  const handleChecked = e => {

    if (e.target.checked) {
      selectedPrefs.push(parseInt(e.target.value));
    }
    else {
      selectedPrefs = selectedPrefs.filter((el) => {
        return el != e.target.value;
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
        className='pref-checkbox'
      />
      <label htmlFor={prefData.prefCode} className='pref-label'>{prefData.prefName}</label>
    </div>
  )
}