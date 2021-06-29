import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import Welcome from "./components/Welcome";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/drivers">Drivers</Link></li>
                            <li><Link to="/teams">Teams</Link></li>
                            <li><Link to="/races">Races</Link></li>
                        </ul>
                    </nav>

                    <Route path="/" exact component={Welcome} />
                    <Route path="/drivers" component={Drivers} />
                    {/* <Route path="/drivers/driverDetails/:id" component={DriverDetails} /> */}
                    {/* <Route path="/teams/teamsDetails/:id" component={teamURL} /> */}
                    <Route path="/teams" component={Teams} />
                    <Route path="/races" component={Races} />
                </div>
            </Router>
        );
    }
}