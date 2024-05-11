import React from 'react';

export default function Textarea(props) {
  return (
    <div className='w-full h-fit py-3 flex flex-col'>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={props.id}>{props.label}</label>
      <textarea
        className=' shadow-md rounded-sm py-3 px-3 h-40 focus:outline-none focus:ring-1 focus:ring-blue-500'
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <p className=' text-red-500'>{props.error}</p>
    </div>
  );
}
