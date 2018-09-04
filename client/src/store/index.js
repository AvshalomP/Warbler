import rootReducer from './reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


export function configureStore() {
    let getComposeEnhancers = () => {
        if (window.navigator.userAgent.includes('Chrome')) {
            console.log("CHROME");
            return compose(
                applyMiddleware(thunk),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        }
        return compose(applyMiddleware(thunk));
    };

    const store = createStore(rootReducer, getComposeEnhancers() );
    return store;
}