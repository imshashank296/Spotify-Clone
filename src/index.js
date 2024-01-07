import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StateContextProvider } from "./utlis/StateProvider";
import { initialState } from "./utlis/Reducer";
import reducer from "./utlis/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateContextProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateContextProvider>
  </React.StrictMode>
);
