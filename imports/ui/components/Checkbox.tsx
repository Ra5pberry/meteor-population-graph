import React from 'react';

export const Checkbox = ({ data }) => {
  return (
    <div>
      <input type="checkbox" value={data.prefCode} id={data.prefCode}/><label htmlFor={data.prefCode}>{data.prefName}</label>
    </div>
  )
}