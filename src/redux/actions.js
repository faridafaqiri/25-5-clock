export const INCREMENT_SESSION = 'INCREMENT_SESSION';
export const DECREMENT_SESSION = 'DECREMENT_SESSION';
export const INCREMENT_BREAK = 'INCREMENT_BREAK';
export const DECREMENT_BREAK = 'DECREMENT_BREAK';
export const RESET = 'RESET';
export const START_STOP = 'START_STOP';
export const TICK = 'TICK';

export const incrementSession = () => ({ type: INCREMENT_SESSION });
export const decrementSession = () => ({ type: DECREMENT_SESSION });
export const incrementBreak = () => ({ type: INCREMENT_BREAK });
export const decrementBreak = () => ({ type: DECREMENT_BREAK });
export const reset = () => ({ type: RESET });
export const startStop = () => ({ type: START_STOP });
export const tick = () => ({ type: TICK });
