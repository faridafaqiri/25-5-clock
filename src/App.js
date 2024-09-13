import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Display from './components/Display';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Display />
        <audio id="beep" src="https://www.soundjay.com/button/beep-07.wav" preload="auto">
          <track kind="captions" srcLang="en" />
        </audio>
      </div>
    </Provider>
  );
}

export default App;
