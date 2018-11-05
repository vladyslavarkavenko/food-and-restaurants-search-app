import {Link} from "react-router-dom";
import React from "react";
import {foodItemRequest} from "../actions/index";
import { connect } from 'react-redux';
import './food.css';
import Roller from "../containers/roller";

class Food extends React.Component {
    render() {
        let foodList = this.props.foodList.map(food => {
            let id = food.fields.item_id;
            return(
                <li key={id} onClick={ () => { this.props.foodItemRequest(id) } }> {food.fields.item_name}  </li>
            )
        })

        let foodListElement = () => {
            if(this.props.foodListIsFetching === 'initial') {
                return(
                    <div className="food-initial">
                        <p> Ops! You didn't ask anything yet...</p>
                    </div>
                )
            } else if (this.props.foodListIsFetching ) {
                return(
                    <div className="food-loading">
                        < Roller />
                        <h2>Loading...</h2>
                        <p>Please wait a few seconds</p>
                    </div>
                )
            } else if(this.props.foodList.length === 0 ) {
                return(
                    <div className="food-not-found">
                        <p> Sorry. We didnt find anything for your request :(</p>
                    </div>
                )
            } else {
                return(
                    <div className="food-list">
                        <ul>{foodList}</ul>
                    </div>
                )
            }
        }

        let foodItemElement = () => {
            if(this.props.foodItemIsFetching === 'initial' ) {
                return(
                    <div className="food-item-initial">
                        <p> Ops! You didn't ask anything yet...</p>
                    </div>
                )
            } else if (this.props.foodItemIsFetching ) {
                return(
                    <div className="food-item-loading">
                        < Roller />
                        <h2>Loading...</h2>
                        <p>Please wait a few seconds</p>
                    </div>
                )
            } else {
                return(
                    <div className="food-item">
                        <div className="active-element">
                            <div className="active-element-header">
                                <div className="item-name"> {this.props.foodItem.item_name} </div>
                                <div className="brand-name"> Brand: {this.props.foodItem.brand_name} </div>
                                <div className="calories"> Calories: {this.props.foodItem.nf_calories} </div>
                            </div>
                            <hr/>
                            <div className="f-c-p">
                                <div className="nutrition">
                                    <h1>Fat:</h1>
                                    {this.props.foodItem.nf_total_fat}
                                </div>
                                <div className="nutrition">
                                    <h1> Carbohydrats: </h1>
                                    {this.props.foodItem.nf_total_carbohydrate}
                                </div>
                                <div className="nutrition">
                                    <h1>Protein: </h1>
                                    {this.props.foodItem.nf_protein}
                                </div>
                            </div>
                            <div className="others">
                                <div className="nutrition">
                                    <h1>Saturated fat: </h1>
                                    {this.props.foodItem.nf_saturated_fat}
                                </div>
                                <div className="nutrition">
                                    <h1> Cholesterol: </h1>
                                    {this.props.foodItem.nf_cholesterol}
                                </div>
                                <div className="nutrition">
                                    <h1>Dietary fiber:</h1>
                                    {this.props.foodItem.nf_dietary_fiber}
                                </div>
                                <div className="nutrition">
                                    <h1>Sugars:</h1>
                                    {this.props.foodItem.nf_sugars}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className="food">
                <div className="food-header">
                    <div className="food-header-left">
                        <h2> Search results </h2>
                        <h3> Common Foods </h3>
                    </div>
                    <div className="food-header-right">
                        <div className="food-home-button">
                            <Link to = "/"  > Home </Link>
                        </div>
                    </div>
                </div >
                <div className="food-body">
                    {foodListElement()}
                    {foodItemElement()}
                </div>

            </div>
        )

    }
};

const mapDispatchToProps = dispatch => {
    return {
        foodItemRequest: id => {
            dispatch(foodItemRequest(id));
        },
    }
};

const mapStateToProps = state => {
    return {
        foodList: state.food.data[0],
        foodItem: state.foodItem.data[0],
        foodListIsFetching: state.food.isFetching,
        foodItemIsFetching: state.foodItem.isFetching
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Food);
