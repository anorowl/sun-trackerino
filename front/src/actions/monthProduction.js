export const MONTH_PRODUCTION_LOADING = "MONTH_PRODUCTION_LOADING";
export const MONTH_PRODUCTION_SUCCESS = "MONTH_PRODUCTION_SUCCESS";
export const MONTH_PRODUCTION_YEAR = "MONTH_PRODUCTION_SET_YEAR";
export const MONTH_PRODUCTION_ERROR = "MONTH_PRODUCTION_ERROR";

export function loading(loading) {
    return {
        type: MONTH_PRODUCTION_LOADING,
        loading,
    };
}

export function success(data) {
    return {
        type: MONTH_PRODUCTION_SUCCESS,
        data,
    };
}

export function error(error) {
    return {
        type: MONTH_PRODUCTION_ERROR,
        error,
    };
}

export function year(year) {
    return {
        type: MONTH_PRODUCTION_YEAR,
        year,
    };
}

export function fetchData(year) {
    return dispatch => {
        dispatch(loading(true));

        const url = `http://localhost:3000/energy-balance/year?year=${year}`;

        return fetch(url, { method: "GET" })
            .then(res => res.json())
            .then(retrieved => {
                dispatch(loading(false));
                dispatch(success(retrieved));
            })
            .catch(e => {
                dispatch(loading(false));
                dispatch(error(e.message));
            });
    };
}