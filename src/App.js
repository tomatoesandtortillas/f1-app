import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import Welcome from "./components/Welcome";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../assets/style.scss";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="main">
                    <div className="top-bar">
                    </div>
                    <div className="side-bar">
                        <div className="logo-div">
                            <img src="../assets/img/formula-1-logo.svg"></img>
                        </div>
                        <nav className="nav">
                            <ul>
                                <li><Link className="list-reset" to="/"><img src="../assets/img/icons/home.png"/>Home</Link></li>
                                <li><Link className="list-reset" to="/drivers"><img/>Drivers</Link></li>
                                <li><Link className="list-reset" to="/teams"><img/>Teams</Link></li>
                                <li><Link className="list-reset" to="/races"><img/>Races</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="content">
                        <Route path="/" exact component={Welcome} />
                        <Route path="/drivers" exact component={Drivers} />
                        <Route path="/driversDetails/:id" exact component={DriverDetails} />
                        <Route path="/teamDetails/:id" component={TeamDetails} />
                        <Route path="/teams" component={Teams} />
                        <Route path="/races" component={Races} />
                    </div>
                </div>
            </Router>
        );
    }

}