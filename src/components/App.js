import React, { useState, useEffect } from 'react';
import Button from './button';
import Display from './Display';

import '../styles/App.css';

const App = () => {
	const [time, setTime] = useState(2000);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				if (time !== 0) {
					setTime((prevValue) => prevValue - 10);
				} else {
					clearInterval(interval);
				}
			}, 10);
		} else if (!running) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	});

	const startStopHandler = () => {
		setRunning((prevValue) => !prevValue);
	};
	const resetHandler = () => {
		setTime(2000);
		setRunning(false);
	};

	const startStopName = running ? 'Pause' : 'Stop';

	return (
		<>
			<div className='counter'>
				<Display time={time} />
				<div className='btn-container'>
					<Button name={startStopName} onClick={startStopHandler} />
					<Button name='Reset' onClick={resetHandler} />
				</div>
			</div>
		</>
	);
};

export default App;
