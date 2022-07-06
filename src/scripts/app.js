import React from "react";
import ReactDOM from "react-dom";
import VendingMachine from "../containers/VendingMachine";
import { Provider } from "react-redux";
import "../styles/app.scss";
import store from "../redux/store";

ReactDOM.createRoot(document.getElementById("app")).render(<Provider store={store}><VendingMachine /></Provider>);