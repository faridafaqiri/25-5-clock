import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tick } from '../redux/actions';

function Timer() {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state) => state.timeLeft);
  const isActive = useSelector((state) => state.isActive);
  const timerLabel = useSelector((state) => state.timerLabel);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        dispatch(tick());
      }, 1000);
    }

    if (timeLeft === 0 && isActive) {
      const isSession = timerLabel === 'Session';
      const beepReset = audioRef.current;

      if (beepReset) {
        beepReset.currentTime = 0;
        beepReset.play().catch((err) => {
          console.error('Audio playback failed:', err);
        });
      }

      dispatch({ type: 'SWITCH_TIMER', isSession });
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, dispatch, timerLabel]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h2 id="timer-label">{timerLabel}</h2>
      <div id="time-left">{formatTime(timeLeft)}</div>
      <audio
        id="beep"
        ref={audioRef}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      >
        <track kind="captions" srcLang="en" />
      </audio>
    </div>
  );
}

export default Timer;
