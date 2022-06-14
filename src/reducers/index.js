import {combineReducers} from 'redux';

import posts from './posts';
import auth from './auth';
import errors from './errors';

export const reducers = combineReducers({
    posts,
    auth,
    errors
    
});