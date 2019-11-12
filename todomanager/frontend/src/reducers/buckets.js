import { GET_BUCKETS, CREATE_BUCKET } from "../actions/types.js";

const initialState = {
    buckets: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BUCKETS:
            return {
                ...state,
                buckets: action.payload
            }
        case CREATE_BUCKET:
            return {
                ...state,
                buckets: [...state.buckets, action.payload]
            }
        default: return state;
    }
}