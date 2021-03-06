import React from "react";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import Welcome from "./components/Welcome";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceDetails from "./components/RaceDetails";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../assets/style.scss";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      isActive: false
    };
    this.handleChangeSearchDrivers = this.handleChangeSearchDrivers.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
  }
  handleChangeSearchDrivers(e) {
    this.setState({ searchTerm: e.target.value });
  }
  toggleClick() {
    console.log("klik", this.state.isActive);
    if(this.state.isActive === false) {
      this.setState({
        isActive: true
      })
    } else {
      this.setState({
        isActive: false
    })}
  };

  render() {
    return (
      <Router>
        <div className="main">
          <div className="top-bar">

            <div className="logo-div-responsive">
              <img src="../assets/img/formula-1-logo.svg"></img>
            </div>
            <div className="search">
            <input
              type="text"
              placeholder="&#x1F50E;&#xFE0E; Search"
              onChange={this.handleChangeSearchDrivers}
            />
            </div>
            <button id="btn" className="drop-btn "
              onClick={this.toggleClick}
            >
              Choose wisely!
              </button>
          </div>
          <div className={`side-bar ${this.state.isActive ? "active" : ""}`}>

            <div className="logo-div">
              <img src="../assets/img/formula-1-logo.svg"></img>
            </div>

            <nav className="nav">
              <ul>
                <li>
                  <div className="imgLink">
                    <img src="../assets/img/icons/home.png" />
                  </div>
                  
                  <Link className="list-reset" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="imgLink">
                    <img src="../assets/img/icons/helmet.png" />
                  </div>
                  <Link className="list-reset" to="/drivers">
                    Drivers
                  </Link>
                </li>
                <li>
                  <div className="imgLink">
                    <img src="../assets/img/icons/timovi.png" />
                  </div>

                  <Link className="list-reset" to="/teams">
                    Teams
                  </Link>
                </li>
                <li>
                  <div className="imgLink">
                    <img src="../assets/img/icons/checkered-flag.png" />
                  </div>

                  <Link className="list-reset" to="/races"
                  >
                    Races
                  </Link>
                </li>
              </ul>

            </nav>
          </div>
          <div className="content">
            <Route path="/" exact component={Welcome} />
            <Route path="/drivers" exact component={() => <Drivers propsSearch={this.state.searchTerm} />} />
            <Route path="/driversDetails/:id" exact component={DriverDetails} />
            <Route path="/teamDetails/:id" exact component={TeamDetails} />
            <Route path="/teams" component={Teams} />
            <Route path="/races" component={() => <Races propsSearch={this.state.searchTerm} />} />
            <Route path="/raceDetails/:id" exact component={RaceDetails} />
          </div>
        </div>
      </Router>

    );
  }
}
