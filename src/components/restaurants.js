import {Link} from "react-router-dom";
import React from "react";
import {restaurantFoodListRequest, restaurantFoodListReset} from "../actions/index";
import { connect } from 'react-redux';
import './restaurants.css';
import Roller from "../containers/roller";
import Loader from "../containers/loader"

class  Restaurant extends React.Component  {
    constructor(props) {
        super(props)

        this.state = {
            menu: false,
            id: null
        }
    }

    switchMenuList = (id) => {
        if(this.state.menu && id === this.state.id) {
            this.props.restaurantFoodListReset();
            this.setState({
                menu: false,
                id: null
            })
        } else {
            this.props.restaurantFoodListRequest(id);
            this.setState({
                menu: true,
                id: id
            })
        }
    }

    render() {
        let displayBrandFoodList = (id) => {
            let list = () => {
                if(this.props.brandFoodListIsFetching) {
                    return(
                        <div className="brand-food-list-loading">
                            < Loader />
                        </div>
                    )
                } else {
                    return (
                        <div className="brand-food-list-body">
                            {brandFoodList}
                        </div>
                    )
                }
            }
            if(id === this.state.id && this.state.menu) {
                    return (
                        <div className="brand-food-list">
                            <div className="brand-food-list-header">
                                <div className="brand-food-list-title" >
                                    <h2> Menu </h2>
                                </div>
                                <hr/>
                            </div>
                            {list()}
                        </div>
                    );
            }
        }

        let brandFoodList = this.props.brandFoodList.map( food => {
            let id = food._id;
            return (
                <div key={id} id={id} className="brand-food-list-item">
                    <h2>{food.fields.item_name}</h2>
                </div>
            )
        })

        let restaurantList = this.props.restaurantList.map(restaurant => {
            let id = restaurant._id;
            return(
                <div key={id} className="restaurant-li-wrapper">
                    <li id={id} className="restaurant">
                        <div className="restaurant-raw">
                            <div className="restaurant-left">
                                <h1 className="restaurant-name" > {restaurant.fields.name} </h1>
                                <p> Website: </p>
                                <a
                                    className="restaurant-website"
                                    href={restaurant.fields.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {restaurant.fields.website}
                                </a>
                            </div>

                            <div className="restaurant-right" onClick={() => { this.switchMenuList(restaurant._id) }}>
                                <i className="fa fa-bars"></i>
                            </div>
                        </div>
                    </li>
                    {displayBrandFoodList(id)}
                </div>


            )
        })

        let restaurantListElement = () => {
            if(this.props.restaurantListIsFetching === 'initial') {
                return(
                    <div className="restaurant-initial">
                        <p> Ops! You didn't ask anything yet...</p>
                    </div>
                )
            } else if (this.props.restaurantListIsFetching ) {
                return(
                    <div className="restaurant-loading">
                        < Roller />
                        <h2>Loading...</h2>
                        <p>Please wait a few seconds</p>
                    </div>
                )
            } else if(this.props.restaurantList.length === 0 ) {
                return(
                    <div className="restaurant-not-found">
                        <p> Sorry. We didnt find anything for your request :(</p>
                    </div>
                )
            } else  {
                return(
                    <div className="restaurant-list">
                        <ul>{restaurantList}</ul>
                    </div>
                )
            }
        }

        return(
            <div className="restaurants">
                <div className="restaurants-header">
                    <div className="restaurants-header-left">
                        <h2> Search results </h2>
                    </div>
                    <div className="restaurants-header-right">
                        <div className="restaurants-home-button">
                            <Link to = "/"> Home </Link>
                        </div>
                    </div>
                </div>
                <div className="restaurants-body">
                    {restaurantListElement()}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        restaurantFoodListRequest: id => {
            dispatch( restaurantFoodListRequest(id) );
        },
        restaurantFoodListReset: () => {
            dispatch( restaurantFoodListReset() );
        }
    }
};

const mapStateToProps = state => {
    return {
        restaurantList: state.restaurant.data[0],
        restaurantListIsFetching: state.restaurant.isFetching,
        brandFoodList: state.brandFood.data[0],
        brandFoodListIsFetching: state.brandFood.isFetching
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Restaurant);