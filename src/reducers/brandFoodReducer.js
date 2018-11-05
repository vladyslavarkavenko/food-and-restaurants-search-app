import {
    BRAND_FOOD_REQUEST,
    BRAND_FOOD_SUCCESS,
    BRAND_FOOD_FAILURE,
    BRAND_FOOD_RESET
} from '../constants';

let initialState = {
    isFetching: 'initial',
    error: null,
    data: [[]]
}

export default function asyncReducer  (state = initialState, action) {
    switch(action.type){
        case BRAND_FOOD_REQUEST:
            return Object.assign( { }, state, { isFetching: true });
        case BRAND_FOOD_SUCCESS:
            return Object.assign( { }, state, {
                isFetching: false,
                data : [action.payload, ...state.data]
            });
        case BRAND_FOOD_FAILURE:
            return Object.assign( { }, state, {
                isFetching: false,
                error: action.payload
            });
        case BRAND_FOOD_RESET:
            return  Object.assign( { }, state, initialState );
        default:
            return state;
    }
}