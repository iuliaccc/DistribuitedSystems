import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';

const configureStore = (spyMiddleware) => {

    const middleware = [
        thunk,
    ];

    if (spyMiddleware) middleware.push(spyMiddleware);

    const enhancers = [applyMiddleware(...middleware)];

    // Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                shouldHotReload: false, // Prevent recomputing reducers for `replaceReducer`
            })
            : compose;

    return createStore(
        rootReducer,
        composeEnhancers(...enhancers)
    );
};

export default configureStore;
