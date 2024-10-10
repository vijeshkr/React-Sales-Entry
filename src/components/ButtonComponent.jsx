import React from 'react';

/**
 * ButtonComponent
 * 
 * A reusable button component that displays a label and handles click events.
 */

const ButtonComponent = ({btnLabel, onClickFn}) => {
    return (
        <button
            className='bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 active:from-indigo-700 active:to-indigo-800 shadow-sm transition-colors text-white px-3 py-1 rounded-md'
            onClick={onClickFn}
        >{btnLabel}</button>
    )
}

export default ButtonComponent;