import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const initialState = {
  currentUser: {
    email: "",
  },
  count: 1,
};
const store = createStore(reducer);

function reducer(state = initialState, action) {
  console.log({ action });
  if (action.type === "SIGN_OUT") return { currentUser: { email: "" } };
  if (action.type === "SIGN_IN")
    return { currentUser: { email: action.payload } };
  if (action.type === "INCREMENT") return { count: state.count + 1 };
  if (action.type === "DECREMENT") return { count: state.count - 1 };
  if (action.type === "INCREMENT_BY")
    return { count: state.count + action.payload };

  return state;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
