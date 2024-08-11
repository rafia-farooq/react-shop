import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./redux/actions";
import { Button } from "@material-ui/core";

export default function Reduxpage() {
    const counter = useSelector (state => state.counter)
    const dispatch = useDispatch()
    

    return (
        <>
            <Button onClick={() => dispatch(increment(2))}> + </Button>
            <span>{counter}</span>
            <Button onClick={() => dispatch(decrement(5))}> - </Button>

            
        </>
    )
}

