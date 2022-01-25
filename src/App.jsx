import react from "react";
import reactDom from "react-dom";
import { Fragment } from "react/cjs/react.production.min";
import { ListaPost } from "./Components/ListaPost";

export function App() {
    return (
        <Fragment>
            <h1>Post It Simulator!</h1>
            <ListaPost />
        </Fragment>
    )
}
