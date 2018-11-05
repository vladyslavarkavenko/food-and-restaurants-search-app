import {FOOD_ITEM_REQUEST, FOOD_ITEM_SUCCESS, FOOD_ITEM_FAILURE} from '../constants';

let initialState = {
    isFetching: 'initial',
    error: null,
    data: [{}]
}

export default function asyncReducer  (state = initialState, action) {
    switch(action.type){
        case FOOD_ITEM_REQUEST:
            return Object.assign( { }, state, { isFetching: true });
        case FOOD_ITEM_SUCCESS:
            return Object.assign( { }, state, {
                isFetching: false,
                data : [action.payload, ...state.data]
            });
        case FOOD_ITEM_FAILURE:
            return Object.assign( { }, state, {
                isFetching: false,
                error: action.payload
            });
        default:
            return state;
    }
}