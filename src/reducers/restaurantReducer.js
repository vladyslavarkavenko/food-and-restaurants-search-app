import {RESTAURANT_REQUEST, RESTAURANT_SUCCESS, RESTAURANT_FAILURE } from '../constants';

let initialState = {
    isFetching: 'initial',
    error: null,
    data: [[]]
}

export default function restaurantReducer  (state = initialState, action) {
    switch(action.type){
        case RESTAURANT_REQUEST:
            return Object.assign( { }, state, { isFetching: true });
        case RESTAURANT_SUCCESS:
            return Object.assign( { }, state, {
                isFetching: false,
                data : [action.payload, ...state.data]
            });
        case RESTAURANT_FAILURE:
            return Object.assign( { }, state, {
                isFetching: false,
                error: action.payload
            });
        default:
            return state;
    }
}