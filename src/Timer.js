import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    incrementSession,
    decrementSession,
    incrementBreak,
    decrementBreak,
    startTimer,
    stopTimer,
    resetTimer,
} from './redux/actions';

const Timer = () => {
    const dispatch = useDispatch();
    const { breakLength, sessionLength, timeLeft, isRunning } = useSelector((state) => state);
    const [timerLabel, setTimerLabel] = useState('Session');
    const audioRef = useRef(null); // Create a ref for the audio element

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                dispatch({ type: 'DECREMENT_TIME' });
            }, 1000);
        } else if (timeLeft === 0) {
            if (audioRef.current) {
                audioRef.current.play(); // Play audio using the ref
            }
            if (timerLabel === 'Session') {
                setTimerLabel('Break');
                dispatch({ type: 'SWITCH_TO_BREAK', breakLength });
            } else {
                setTimerLabel('Session');
                dispatch({ type: 'SWITCH_TO_SESSION', sessionLength });
            }
        }
        return () => clearInterval(timer); // Cleanup
    }, [isRunning, timeLeft, dispatch, timerLabel, breakLength, sessionLength]);

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, '0');
        const seconds = String(time % 60).padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset audio to the start
        }
        dispatch(resetTimer()); // Reset break and session lengths
        setTimerLabel('Session'); // Reset the timer label to "Session"
    };

    const handleStartStop = () => {
        if (isRunning) {
            dispatch(stopTimer());
        } else {
            dispatch(startTimer());
        }
    };

    const handleIncrementSession = () => {
        if (sessionLength < 60) {
            dispatch(incrementSession());
        }
    };

    const handleDecrementSession = () => {
        if (sessionLength > 1) {
            dispatch(decrementSession());
        }
    };

    const handleIncrementBreak = () => {
        if (breakLength < 60) {
            dispatch(incrementBreak());
        }
    };

    const handleDecrementBreak = () => {
        if (breakLength > 1) {
            dispatch(decrementBreak());
        }
    };

    return (
        <>
            <h1 className="title">25 + 5 Clock</h1>  {/* Title added here */}
            <div className="App">
                <h2 id="timer-label">{timerLabel}</h2>
                <div id="time-left">{formatTime(timeLeft)}</div>
                <div className="controls">
                    <div className="session-controls">
                        <h3 id="session-label">Session Length</h3>
                        <div id="session-length">{sessionLength}</div>
                        <button onClick={handleDecrementSession} id="session-decrement">-</button>
                        <button onClick={handleIncrementSession} id="session-increment">+</button>
                    </div>
                    <div className="break-controls">
                        <h3 id="break-label">Break Length</h3>
                        <div id="break-length">{breakLength}</div>
                        <button onClick={handleDecrementBreak} id="break-decrement">-</button>
                        <button onClick={handleIncrementBreak} id="break-increment">+</button>
                    </div>
                </div>
                <button onClick={handleStartStop} id="start_stop">
                    {isRunning ? "Pause" : "Start"}
                </button>
                <button onClick={handleReset} id="reset">Reset</button>
                <audio
                    id="beep"
                    ref={audioRef}
                    src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
                    preload="auto"
                >
                    <track kind="captions" srcLang="en" />
                </audio>
            </div>
        </>
    );
};

export default Timer;