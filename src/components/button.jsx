import React from 'react';

import '../styles/button.css'

const Button = ( {name, onClick}) => {
    return (
        <>
        <button className='btn' onClick={onClick}>{name}</button>
        </>
    )
}

export default Button;