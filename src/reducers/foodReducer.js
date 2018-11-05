import {FOOD_REQUEST, FOOD_SUCCESS, FOOD_FAILURE} from '../constants';

let initialState = {
    isFetching: 'initial',
    error: null,
    data: [[]]
}

export default function foodReducer  (state = initialState, action) {
    switch(action.type){
        case FOOD_REQUEST:
            return Object.assign( { }, state, { isFetching: true });
        case FOOD_SUCCESS:
            return Object.assign( { }, state, {
                isFetching: false,
                data : [action.payload, ...state.data]
            });
        case FOOD_FAILURE:
            return Object.assign( { }, state, {
                isFetching: false,
                error: action.payload
            });
        default:
            return state;
    }
}