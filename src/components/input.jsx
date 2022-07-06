import React from 'react';

const Input = ({ value, onChange, title }) => {
	return (
		<div className='input'>
			<p className='text-input'>{title}</p>
			<input type='number' value={value} onChange={onChange} min='0' max='59' />
		</div>
	);
};

export default Input;
