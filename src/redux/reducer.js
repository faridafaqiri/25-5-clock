import {
  INCREMENT_SESSION,
  DECREMENT_SESSION,
  INCREMENT_BREAK,
  DECREMENT_BREAK,
  RESET,
  START_STOP,
  TICK,
} from './actions';

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  timeLeft: 1500,
  isActive: false,
  timerLabel: 'Session',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_SESSION:
      return state.sessionLength < 60
        ? {
          ...state,
          sessionLength: state.sessionLength + 1,
          timeLeft: (state.sessionLength + 1) * 60,
        }
        : state;

    case DECREMENT_SESSION:
      return state.sessionLength > 1
        ? {
          ...state,
          sessionLength: state.sessionLength - 1,
          timeLeft: (state.sessionLength - 1) * 60,
        }
        : state;

    case INCREMENT_BREAK:
      return state.breakLength < 60
        ? {
          ...state,
          breakLength: state.breakLength + 1,
        }
        : state;

    case DECREMENT_BREAK:
      return state.breakLength > 1
        ? {
          ...state,
          breakLength: state.breakLength - 1,
        }
        : state;

    case RESET: {
      const beepReset = document.getElementById('beep');
      if (beepReset) {
        beepReset.pause();
        beepReset.currentTime = 0;
      }
      return {
        ...initialState,
        timeLeft: 1500,
        isActive: false,
        timerLabel: 'Session',
      };
    }

    case START_STOP:
      return { ...state, isActive: !state.isActive };

    case TICK: {
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }
      if (state.isActive) {
        const isSession = state.timerLabel === 'Session';
        const newTimeLeft = isSession ? state.breakLength * 60 : state.sessionLength * 60;

        return {
          ...state,
          timeLeft: newTimeLeft,
          timerLabel: isSession ? 'Break' : 'Session',
        };
      }
      return state;
    }

    default:
      return state;
  }
};

export default reducer;
