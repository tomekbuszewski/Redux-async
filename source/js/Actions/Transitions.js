import builder from '../Services/ActionNameBuilder';

const PREFIX = 'app';
export const START_TRANSITION = builder(PREFIX, 'start transition');
export const END_TRANSITION = builder(PREFIX, 'end transition');
export const TOGGLE_TRANSITION = builder(PREFIX, 'toggle transition');

export const start = () => dispatch => { dispatch({ type: START_TRANSITION }) };
export const end = () => dispatch => { dispatch({ type: END_TRANSITION }) };
export const toggle = () => dispatch => { dispatch({ type: TOGGLE_TRANSITION }) };