import { createStore, applyMiddleware } from "redux";
// import rootReducer from "./reducers/reducer";
import thunk from "redux-thunk";
import { compose } from "redux";

import { combineReducers } from "redux";
const initialState = {
    open: false,
    severity: null,
    message: "",
};
  
const alertReducer = (state = initialState, action) => {
    switch (action.type) {
    case "SHOW_ALERT_MESSAGE":
        return action.payload;
    case "CLOSE_ALERT_MESSAGE":
        return action.payload;
    default: return state;
    }
};

const rootReducer = combineReducers({
    alert: alertReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;