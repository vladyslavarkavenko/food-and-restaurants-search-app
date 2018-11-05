import {Link} from "react-router-dom";
import {foodRequest, restaurantRequest} from "../actions/index";
import { connect } from 'react-redux';
import React from "react";
import './home.css';

class Home extends React.Component {

    state = {
        foodValue: '',
        restaurantValue: ''
    };

    foodData = (e) => {
        this.setState({foodValue: e.target.value});
    }

    restaurantData = (e) => {
        this.setState({restaurantValue: e.target.value});
    }

    findFood = () => {
        if(this.state.foodValue.trim() !== ''){
            this.props.foodRequest(this.state.foodValue);
        }
        this.setState({foodValue: ''});
    }

   findRestaurants = () => {
        if(this.state.restaurantValue.trim() !== '') {
            this.props.restaurantRequest(this.state.restaurantValue);
        }
        this.setState({restaurantValue: ''});
    }

    handleKeyUp = (e, n) => {
        e.preventDefault();
        if (e.keyCode === 13) {
            document.getElementsByClassName("search-button")[n].click();
        }
    }

    render() {
        return (
            <div className="home">

                <div className="section food">
                    <div className="search">
                        <input
                            className="search-input"
                            placeholder="Food..."
                            value = {this.state.foodValue}
                            name="foodValue"
                            onChange = {(e)=>{this.foodData(e)}}
                            onKeyUp={ e => this.handleKeyUp(e, 0) }
                        />
                        <Link
                            to="/food"
                            className="search-button"
                            onClick={this.findFood}
                        > Search </Link>
                    </div>
                </div>

                <div className="section restaurant">
                    <div className="search">
                        <input
                            className="search-input"
                            placeholder="Restaurants..."
                            value = {this.state.restaurantValue}
                            name="restaurantValue"
                            onChange = {(e)=>{this.restaurantData(e)}}
                            onKeyUp={ e => this.handleKeyUp(e, 1) }
                        />
                        <Link
                            to="/restaurant"
                            className="search-button"
                            onClick={this.findRestaurants}
                        > Search </Link>
                    </div>
                </div>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        foodRequest: name => {
            dispatch(foodRequest(name));
        },
        restaurantRequest: name => {
            dispatch(restaurantRequest(name));
        }

    }
};

export default connect(
    null,
    mapDispatchToProps
)(Home);
