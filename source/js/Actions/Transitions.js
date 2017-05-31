import builder from '../Services/ActionNameBuilder';

const PREFIX = 'app';
export const START_TRANSITION = builder(PREFIX, 'start transition');
export const END_TRANSITION = builder(PREFIX, 'end transition')