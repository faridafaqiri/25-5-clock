import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementSession,
  decrementSession,
  incrementBreak,
  decrementBreak,
  reset,
  startStop,
} from '../redux/actions';

function Controls() {
  const dispatch = useDispatch();
  const sessionLength = useSelector((state) => state.sessionLength);
  const breakLength = useSelector((state) => state.breakLength);

  return (
    <div className="controls">
      <div id="session-label" className="control-label">Session Length</div>
      <div id="session-length" className="control-value">{sessionLength}</div>
      <button type="button" id="session-decrement" className="control-button" onClick={() => dispatch(decrementSession())}>-</button>
      <button type="button" id="session-increment" className="control-button" onClick={() => dispatch(incrementSession())}>+</button>

      <div id="break-label" className="control-label">Break Length</div>
      <div id="break-length" className="control-value">{breakLength}</div>
      <button type="button" id="break-decrement" className="control-button" onClick={() => dispatch(decrementBreak())}>-</button>
      <button type="button" id="break-increment" className="control-button" onClick={() => dispatch(incrementBreak())}>+</button>

      {/* Move buttons below the break controls */}
      <div className="action-buttons">
        <button type="button" id="start_stop" className="action-button" onClick={() => dispatch(startStop())}>Start/Stop</button>
        <button type="button" id="reset" className="action-button" onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
}

export default Controls;
