import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer'

export const ConfigureStore = () => {

    let middleware = [];
    if (process.env.NODE_ENV === 'development') {
        middleware = [...middleware, thunk, logger];
    } else {
        middleware = [...middleware, thunk];
    }

    const store = createStore(
        combineReducers({
            resume: reducer,
        }),
        applyMiddleware(...middleware)
    );

    return store;
}
