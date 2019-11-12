import {combineReducers} from 'redux';
import todoReducer from './todos';
import errorReducer from './errors';
import authReducer from './auth';
import bucketReducer from './buckets'

export default combineReducers({
    todoReducer,
    errorReducer,
    authReducer,
    bucketReducer
}); 