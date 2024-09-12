import { Provider } from 'react-redux'; // Move this import to the top
import React from 'react';
import Timer from './Timer';
import store from './redux/store';
import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Timer />
    </div>
  </Provider>
);

export default App;