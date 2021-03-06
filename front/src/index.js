import React from "react";
import ReactDOM from "react-dom";

import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import {
    ConnectedRouter,
    connectRouter,
    routerMiddleware
} from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";

import reducers from "./reducers";
import Dashboard from "./components/dashboard";

const history = createBrowserHistory();

const store = createStore(
    combineReducers({
        router: connectRouter(history),
        ...reducers,
    }),
    {},
    applyMiddleware(routerMiddleware(history), thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" component={Dashboard} />
                <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('react-root')
);