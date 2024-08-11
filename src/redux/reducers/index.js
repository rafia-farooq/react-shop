import { combineReducers } from "redux";
import { counter } from "./counter";
import { userauth } from "./userauth";
import { addCart } from "./cart";

export const allReducers = combineReducers ({
    counter,
    userauth,
    addCart
})