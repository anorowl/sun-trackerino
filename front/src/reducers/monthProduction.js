import { combineReducers } from "redux";
import * as Actions from "../actions/monthProduction";

function data(state = [], action) {
    switch(action.type) {
        case Actions.MONTH_PRODUCTION_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function loading(state = false, action) {
    switch(action.type) {
        case Actions.MONTH_PRODUCTION_LOADING:
            return action.loading;
        default:
            return state;
    }
}

function error(state = null, action) {
    switch(action.type) {
        case Actions.MONTH_PRODUCTION_ERROR:
            return action.error;
        case Actions.MONTH_PRODUCTION_SUCCESS:
            return null;
        default:
            return state;
    }
}

function year(state = 2020, action) {
    switch(action.type) {
        case Actions.MONTH_PRODUCTION_YEAR:
            return action.year;
        default:
            return state;
    }
}

function month(state = 0, action) {
    switch(action.type) {
        case Actions.MONTH_PRODUCTION_MONTH:
            return action.month;
        default:
            return state;
    }
}

export default combineReducers({
    data,
    loading,
    error,
    year,
    month,
});