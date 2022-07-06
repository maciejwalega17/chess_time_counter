import React from 'react';

const Input = ({ value, onChange, min, max }) => {
	return (
		<input type='number' value={value} onChange={onChange} min='0' max='59' />
	);
};

export default Input;
