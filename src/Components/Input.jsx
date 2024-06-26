// Input.js
import React from "react";

const Input = ({ label, name, type, placeholder, value, onChange,error }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className=' text-red-500'>{error}</p>
        </div>
    );
};

export default Input;
