import axios from "axios";
import { GET_TODOS, DELETE_TODO, ADD_TODO, UPDATE_TODO, GET_ERRORS } from './types';
import { getTokenConfig } from './auth';

export const getTodos = () => (dispatch, getState) => {
    axios.get('/api/todos/', getTokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_TODOS,
                payload: res.data
            })
        })
        .catch(err => catchError(err, dispatch));

}

export const deleteTodo = (id) => (dispatch, getState) => {
    axios.delete(`/api/todos/${id}/`, getTokenConfig(getState))
        .then(res => {
            dispatch({
                type: DELETE_TODO,
                payload: id
            })
        })
        .catch(err => catchError(err, dispatch));

}

export const addTodo = (todo) => (dispatch, getState) => {
    axios.post('/api/todos/', todo, getTokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_TODO,
                payload: res.data
            })
        })
        .catch(err => catchError(err, dispatch));
}

export const updateTodo = (todo) => (dispatch, getState) => {
    axios.put(`/api/todos/${todo.id}/`, todo, getTokenConfig(getState))
        .then(res => {
            dispatch({
                type: UPDATE_TODO,
                payload: res.data
            })
        })
        .catch(err => catchError(err, dispatch));
}

export const catchError = (err, dispatch) => {
    const error = {
        msg: err.response.data,
        status: err.response.status
    }
    dispatch({
        type: GET_ERRORS,
        payload: error
    })
}