import React, { useState, useEffect } from 'react';
import Button from './button';
import Display from './display';

import '../styles/App.css';

const App = () => {

	const [resetValue, setResetValue] = useState(260000);
	const [timeA, setTimeA] = useState(resetValue);
	const [timeB, setTimeB] = useState(resetValue);
	const [running, setRunning] = useState(false);
	const [whoActive, setWhoActive] = useState('Player A');

	useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				if (whoActive === 'Player A') {
					if (timeA !== 0) {
						setTimeA((prevValue) => prevValue - 10);
					} else {
						clearInterval(interval);
					}
				} else if (whoActive === 'Player B') {
					if (timeB !== 0) {
						setTimeB((prevValue) => prevValue - 10);
					} else {
						clearInterval(interval);
					}
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
		setTimeA(resetValue);
		setTimeB(resetValue);
		setRunning(false);
	};
	const switchHandler = () => {
		if (whoActive === 'Player A') {
			setWhoActive('Player B');
		} else if (whoActive === 'Player B') {
			setWhoActive('Player A');
		}
	};

	const startStopName = running ? 'Stop' : 'Start';

	return (
		<>
			<div className='counter'>
				<p>Player A</p>
				<Display time={timeA} />
				<p>Player B</p>
				<Display time={timeB} />
				<div className='btn-container'>
					<Button name='Switch' onClick={switchHandler} />
					<Button name={startStopName} onClick={startStopHandler} />
					<Button name='Reset' onClick={resetHandler} />
				</div>
			</div>
		</>
	);
};

export default App;
