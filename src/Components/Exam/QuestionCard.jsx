import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; 

export default function QuestionCard({ question, qno, markedOption, markQuestion }) {
    const { options } = question;
    const [marked, setMarked] = useState(-1);

    useEffect(() => {
        setMarked(markedOption);
    }, [markedOption]);

    return (
        <div key={question._id} className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-4"> Q{qno + 1}. {question.description}</h3>
            <div className='grid grid-cols-2'>
                {
                    options.map((option, i) => (
                        <div key={i} onClick={() => { markQuestion(question._id, i); setMarked(i); }} className={`cursor-pointer flex  items-center ${marked === i ? 'text-green-500 font-bold' : ''}`}>
                            <div className={`w-6 h-6 rounded-full border flex items-center justify-center mr-2 ${marked === i ? 'bg-green-500 text-white' : 'border-gray-300'}`}>
                                {marked === i && <FaCheckCircle />}
                            </div>
                            {String.fromCharCode(97 + i)}. {option}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
