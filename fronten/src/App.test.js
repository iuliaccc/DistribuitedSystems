import React from 'react';
import makeApp from './utils/makeApp';
import {mount} from 'enzyme';
import App from './App';

const type = 'My Action';
const action = (text = 'test') => ({type, text});

describe('its working', () => {

    it('should render this', async () => {
        const {Cmp, dispatch, getState, spyMiddleware} = makeApp(<App/>);
        const app = mount(Cmp);

        // console.log(app.debug());

        dispatch(action());
        const reducedAction = await spyMiddleware.until(type);

        const state = getState();

        expect(app.text()).toEqual('hello');
        expect(reducedAction).toEqual({type, text: 'test'});
        expect(state).toEqual({default: []});
    });
});
