import React from 'react';

export default function Textarea(props) {
  return (
    <div className='w-full h-fit py-3 flex flex-col'>
      {/* <label className='font-bold text-lg' htmlFor={props.id}>{props.label}</label> */}
      <textarea
        className='bg-[#F3F3F3] rounded-sm py-3 px-3 h-40 focus:outline-none focus:ring-1 focus:ring-blue-500'
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}
