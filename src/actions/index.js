import {
    FOOD_REQUEST,
    FOOD_SUCCESS,
    FOOD_FAILURE,
    FOOD_ITEM_REQUEST,
    FOOD_ITEM_SUCCESS,
    FOOD_ITEM_FAILURE,
    RESTAURANT_REQUEST,
    RESTAURANT_SUCCESS,
    RESTAURANT_FAILURE,
    BRAND_FOOD_REQUEST,
    BRAND_FOOD_SUCCESS,
    BRAND_FOOD_FAILURE,
    BRAND_FOOD_RESET
} from '../constants';

let searchFood = name =>  `https://api.nutritionix.com/v1_1/search/${name}?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=5b53670c&appKey=5429abb68171830ea68bc5a2977b88f1`;
let searchFoodItem = id => `https://api.nutritionix.com/v1_1/item?id=${id}&appId=5b53670c&appKey=5429abb68171830ea68bc5a2977b88f1` ;
let searchRestaurants = name => `https://api.nutritionix.com/v1_1/brand/search?query=${name}&type=1&min_score=1&appId=5b53670c&appKey=5429abb68171830ea68bc5a2977b88f1`;
let searchBrandFood = id => `https://api.nutritionix.com/v1_1/search/?brand_id=${id}&results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=5b53670c&appKey=5429abb68171830ea68bc5a2977b88f1`;

// Food List

export const foodRequest = name => dispatch => {
    dispatch( { type: FOOD_REQUEST } );
    fetch(searchFood(name))
        .then( res => res.json() )
        .then( foodList => dispatch(foodSuccess(foodList.hits)) )
        .catch(err => dispatch(foodFailure(err)) )
};

export const foodSuccess = foodList => ({
    type: FOOD_SUCCESS,
    payload: foodList
});

export const foodFailure = err => ({
    type: FOOD_FAILURE,
    payload: err
});

// Food Item

export const foodItemRequest = id => dispatch => {
    dispatch( { type: FOOD_ITEM_REQUEST } );
    fetch(searchFoodItem(id))
        .then( res => res.json() )
        .then( item => dispatch(foodItemSuccess(item)) )
        .catch(err=> dispatch(foodItemFailure(err)) )
}

export const foodItemSuccess = item => ({
    type: FOOD_ITEM_SUCCESS,
    payload: item
});

export const foodItemFailure = err => ({
    type: FOOD_ITEM_FAILURE,
    payload: err
});

//Restaurant List

export const restaurantRequest = name => dispatch => {
    dispatch( { type: RESTAURANT_REQUEST } );
    fetch(searchRestaurants(name))
        .then( res => res.json() )
        .then( restaurantList => dispatch(restaurantSuccess(restaurantList.hits)) )
        .catch(err => dispatch(restaurantFailure(err)) )
};

export const restaurantSuccess = restaurantList => ({
    type: RESTAURANT_SUCCESS,
    payload: restaurantList
});

export const restaurantFailure = err => ({
    type: RESTAURANT_FAILURE,
    payload: err
});

//Brand Food

export const restaurantFoodListRequest = id => dispatch => {
    dispatch( { type: BRAND_FOOD_REQUEST } );
    fetch(searchBrandFood (id))
        .then( res => res.json() )
        .then( brandFoodList =>  dispatch(restaurantFoodListSuccess(brandFoodList.hits)) )
        .catch( err => dispatch(restaurantFoodListFailure(err)))
};

export const restaurantFoodListSuccess = brandFoodList => ({
        type:  BRAND_FOOD_SUCCESS,
        payload: brandFoodList
    })

export const  restaurantFoodListFailure = err => ({
    type: BRAND_FOOD_FAILURE,
    payload: err
});

export const restaurantFoodListReset = () => ({
    type:  BRAND_FOOD_RESET
})

