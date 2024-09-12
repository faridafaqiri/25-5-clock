// src/redux/reducers.js
import {
  INCREMENT_SESSION,
  DECREMENT_SESSION,
  INCREMENT_BREAK,
  DECREMENT_BREAK,
  START_TIMER,
  STOP_TIMER,
  RESET_TIMER,
  DECREMENT_TIME,
  SWITCH_TO_SESSION,
  SWITCH_TO_BREAK,
} from './actions';

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500,
  isRunning: false,
};

const timerReducer = (state = initialState, action) => {
  switch (action.type) {
      case INCREMENT_SESSION:
          return { ...state, sessionLength: state.sessionLength + 1, timeLeft: (state.sessionLength + 1) * 60 };
      case DECREMENT_SESSION:
          return { ...state, sessionLength: Math.max(state.sessionLength - 1, 1), timeLeft: (Math.max(state.sessionLength - 1, 1)) * 60 };
      case INCREMENT_BREAK:
          return { ...state, breakLength: state.breakLength + 1 };
      case DECREMENT_BREAK:
          return { ...state, breakLength: Math.max(state.breakLength - 1, 1) };
      case START_TIMER:
          return { ...state, isRunning: true };
      case STOP_TIMER:
          return { ...state, isRunning: false };
      case RESET_TIMER:
          return {
              ...state,
              breakLength: 5,
              sessionLength: 25,
              timeLeft: 1500,
              isRunning: false,
          };
      case DECREMENT_TIME:
          return { ...state, timeLeft: state.timeLeft - 1 };
      case SWITCH_TO_BREAK:
          return { ...state, timeLeft: state.breakLength * 60 };
      case SWITCH_TO_SESSION:
          return { ...state, timeLeft: state.sessionLength * 60 };
      default:
          return state;
  }
};

export default timerReducer;