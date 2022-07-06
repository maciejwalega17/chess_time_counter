import React, { useState, useEffect } from 'react';
import Button from './button';
import '../styles/App.css';

const App = () => {
	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else if (!running) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [running]);

	return (
		<>
			return (
			<div className='counter'>
				<div className='numbers'>
					<span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
					<span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
					<span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
				</div>
				<div className='btn-container'>
          <Button name='Start' onClick={() => setRunning(true)}/>
          <Button name='Stop' onClick={() => setRunning(false)}/>
          <Button name='Reset' onClick={() => setTime(0)}/>
				</div>
			</div>
		</>
	);
};

export default App;
