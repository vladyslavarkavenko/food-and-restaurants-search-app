import { combineReducers } from 'redux';
import food from './foodReducer';
import foodItem from './foodItemReducer';
import restaurant from './restaurantReducer';
import brandFood from './brandFoodReducer';

export default combineReducers({
    food,
    foodItem,
    restaurant,
    brandFood
});