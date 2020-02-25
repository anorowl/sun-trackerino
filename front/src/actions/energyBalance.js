export const ENERGY_BALANCE_LOADING = "ENERGY_BALANCE_LOADING";
export const ENERGY_BALANCE_SUCCESS = "ENERGY_BALANCE_SUCCESS";
export const ENERGY_BALANCE_START = "ENERGY_BALANCE_SET_START";
export const ENERGY_BALANCE_END = "ENERGY_BALANCE_SET_END";
export const ENERGY_BALANCE_ERROR = "ENERGY_BALANCE_ERROR";

export function loading(loading) {
    return {
        type: ENERGY_BALANCE_LOADING,
        loading,
    };
}

export function success(data) {
    return {
        type: ENERGY_BALANCE_SUCCESS,
        data,
    };
}

export function error(error) {
    return {
        type: ENERGY_BALANCE_ERROR,
        error,
    };
}

export function start(start) {
    return {
        type: ENERGY_BALANCE_START,
        start,
    };
}

export function end(end) {
    return {
        type: ENERGY_BALANCE_END,
        end,
    };
}

export function fetchData(start, end) {
    return dispatch => {
        dispatch(loading(true));

        const url = `http://localhost:3000/energy-balance/dateinterval?begin_date=${encodeURIComponent(start)}&end_date=${encodeURIComponent(end)}`;

        return fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(retrieved => {
                debugger
                dispatch(loading(false));
                dispatch(success(retrieved));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}