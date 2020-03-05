import { combineReducers } from "redux";
import * as Actions from "../actions/energyBalance";

function data(state = [], action) {
    switch(action.type) {
        case Actions.ENERGY_BALANCE_SUCCESS:
            return action.data;
        default:
            return state;
    }
}

function loading(state = false, action) {
    switch(action.type) {
        case Actions.ENERGY_BALANCE_LOADING:
            return action.loading;
        default:
            return state;
    }
}

function error(state = null, action) {
    switch(action.type) {
        case Actions.ENERGY_BALANCE_ERROR:
            return action.error;
        case Actions.ENERGY_BALANCE_SUCCESS:
            return null;
        default:
            return state;
    }
}

function start(state = "2020-01-01", action) {
    switch(action.type) {
        case Actions.ENERGY_BALANCE_START:
            return action.start;
        default:
            return state;
    }
}

function end(state = "2020-03-01", action) {
    switch(action.type) {
        case Actions.ENERGY_BALANCE_END:
            return action.end;
        default:
            return state;
    }
}

export default combineReducers({
    data,
    loading,
    error,
    start,
    end,
});