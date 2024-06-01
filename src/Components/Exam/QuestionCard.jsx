import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa'; 

export default function QuestionCard({ question, qno, markedOption, markQuestion }) {
    // console.log(question);
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
                        <div key={i} onClick={() => {markQuestion(question._id, i,) 
                        setMarked(i)} } className={`cursor-pointer flex  items-center ${marked === i ? 'text-green-500 font-bold' : ''}`}>
                            
                            {String.fromCharCode(97 + i)}. {option}
                            {marked === i && <FaCheckCircle className='mx-2'/>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
