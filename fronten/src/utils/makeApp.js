import React from 'react';
import {Provider} from 'react-redux';
import createStore from '../config/redux'
import makeSpyMiddleware from 'spy-middleware';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'raf/polyfill';

configure({adapter: new Adapter()});

const makeApp = (Cmp) => {
    const spyMiddleware = makeSpyMiddleware();

    const store = createStore(spyMiddleware);

    const {dispatch, getState} = store;

    const cmp = (
        <Provider store={store}>
            {Cmp}
        </Provider>
    );

    return {
        Cmp: cmp,
        spyMiddleware,
        dispatch,
        getState
    }
};

export default makeApp;
