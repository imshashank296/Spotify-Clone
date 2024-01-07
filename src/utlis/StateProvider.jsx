import { createContext, useContext, useReducer } from "react";
import reducer from "./Reducer";
import { initialState } from "./Reducer";
export const StateContext = createContext();

export const StateContextProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
