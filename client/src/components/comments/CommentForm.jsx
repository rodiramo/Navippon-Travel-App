import React, { useState } from 'react';

const CommentForm = ({ btnLabel, formSubmitHanlder, formCancelHandler = null, initialText= "", }) => {
    const [value, setValue] = useState(initialText);
    
    const submitHandler = (e) => {
        e.preventDefault();
        formSubmitHanlder(value);
        setValue(""); 
    };

    return (
        <form onSubmit={submitHandler} className='bg-[#F4F4F4] p-4 rounded'>
            <div>
                <textarea
                    className='w-full focus:outline-none'
                    rows='5'
                    placeholder='Escribe un comentario...'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className='flex items-center gap-x-2 pt-2'>
                    {formCancelHandler && (
                        <button onClick={formCancelHandler} type='button' className='px-4 py-2 mt-2 rounded-lg border border-[#FF4A5A] text-[#FF4A5A]'>
                            Cancelar
                        </button>
                    )}
                    
                <button type='submit' className="bg-[#FF4A5A] text-white px-4 py-2 rounded mt-2">
                    {btnLabel}
                </button>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;