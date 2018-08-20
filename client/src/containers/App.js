import React from 'react';
import { Provider } from 'react-redux'; //so we can pass the store object as a prop
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom'; //so we can navigate from page to page the React way
import Navbar from './Navbar';
import Main from './Main';

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <Router>
            <div className="onboarding">
                <Navbar />
                <Main />
            </div>
        </Router>
    </Provider>
);

export default App;
