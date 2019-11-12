import axios from "axios";
import { GET_BUCKETS, CREATE_BUCKET } from './types';
import { getTokenConfig } from './auth';
import { catchError } from './todos';

export const getBuckets = () => (dispatch, getState) => {
    axios.get('/api/buckets/', getTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_BUCKETS,
                payload: res.data
            })
        })
        .catch(err => catchError(err, dispatch));

}

export const createBucket = (bucket) => (dispatch, getState) => {
    axios.post('/api/buckets/', bucket, getTokenConfig(getState))
        .then(res => {
            dispatch({
                type: CREATE_BUCKET,
                payload: res.data
            })
        })
        .catch(err => catchError(err, dispatch));
}