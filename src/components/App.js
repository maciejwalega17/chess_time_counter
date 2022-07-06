import React, { useState, useEffect } from 'react';
import Button from './button';
import Display from './display';
import Modal from './modal';
import Input from './input';

import '../styles/App.css';

const App = () => {
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const [resetValue, setResetValue] = useState(260000);

	const [timeA, setTimeA] = useState(resetValue);
	const [timeB, setTimeB] = useState(resetValue);
	const [running, setRunning] = useState(false);
	const [whoActive, setWhoActive] = useState('Player A');

	const [showModal, setshowModal] = useState(false);

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

	const handleExchange = () => {
		const newTime = hours * 3600000 + minutes * 60000 + seconds * 1000;
		setResetValue(newTime);
		setshowModal((prevValue) => !prevValue);
		setHours(0);
		setMinutes(0);
		setSeconds(0);
	};

	const startStopName = running ? 'Stop' : 'Start';

	const valueChangeHandler = (callback, value) => {
		if (value > 59) {
			callback(59);
		} else if (value < 0) {
			callback(0);
		} else {
			callback(value);
		}
	};

	const modalContent = (
		<div className='flex-column'>
			<div className='input-container'>
				<Input
        title='Hours'
					value={hours}
					onChange={(e) => valueChangeHandler(setHours, e.target.value)}
				/>
				<Input
        title='Minutes'
					value={minutes}
					onChange={(e) => valueChangeHandler(setMinutes, e.target.value)}
				/>
				<Input
        title='Seconds'
					value={seconds}
					onChange={(e) => valueChangeHandler(setSeconds, e.target.value)}
				/>
			</div>
			<Button name='OK' onClick={handleExchange} />
		</div>
	);

	return (
		<>
			<Button
				name='Value'
				onClick={() => setshowModal((prevValue) => !prevValue)}
			/>
			<Modal
				content={modalContent}
				onClick={() => setshowModal((prevValue) => !prevValue)}
				show={showModal}
			/>
			<div className='counter'>
				<h3 className={`${whoActive === 'Player A' ? 'active' : null} player`}>
					Player A
				</h3>
				<Display time={timeA} />
				<h3 className={`${whoActive === 'Player B' ? 'active' : null} player`}>
					Player B
				</h3>
				<Display time={timeB} />
				<div className='btn-container-big'>
					<Button name='Switch' onClick={switchHandler} />
					<div className='btn-container-small'>
						<Button name={startStopName} onClick={startStopHandler} />
						<Button name='Reset' onClick={resetHandler} />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
