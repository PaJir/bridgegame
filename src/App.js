import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Main from "./component/Main";

class App extends Component {
    render() {
        return (
            <BrowserRouter basename={"/bridgegame"}>
                {/* /下面这一行，用于本地调试 */}
                {/* <BrowserRouter> */}
                <Route path="/" exact component={Main} />
            </BrowserRouter>
        );
    }
}

export default App;
