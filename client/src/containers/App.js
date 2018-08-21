import React from 'react';
import { Provider } from 'react-redux'; //so we can pass the store object as a prop
import { configureStore } from '../store';
import { BrowserRouter as Router } from 'react-router-dom'; //so we can navigate from page to page the React way
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";
import jwtDecode from 'jwt-decode';

const store = configureStore();

// logic to see if there is a token when the page is refreshed
if(localStorage.jwtToken){
    setAuthorizationToken(localStorage.jwtToken);
    //prevent someone from manually tampering with the key of jwtToken in localStorage
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (event) {
        store.dispatch(setCurrentUser({})); //force logout
    }
}

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
