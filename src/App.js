// src/App.js
import React from 'react';
import Timer from './Timer';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <Timer />
            </div>
        </Provider>
    );
};

export default App;