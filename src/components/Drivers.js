import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Flag from "react-flagkit";

export default class Drivers extends React.Component {
  constructor() {
    super();
    this.state = {
      drivers: [],
      season: "",
      isLoaded: false,
      flags: [],
    };
  }
  componentDidMount() {
    this.getDrivers();
    this.getFlags();
  }
  getDrivers() {
    var url = "http://ergast.com/api/f1/2013/driverStandings.json";
    $.get(url, (data) => {
      this.setState({
        drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
        season: data.MRData.StandingsTable.season,
        isLoaded: true,
      });
    });
  }
  getFlags() {
    var urlFlag =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    $.get(urlFlag, (data) => {
      var flags = JSON.parse(data);
      this.setState({
        flags: flags,
      });
    });
  }
  render() {
    if (!this.state.isLoaded) {
      return <div className="loader">
        <Loader type="Puff" color="#3c6e71ff" height={100} width={100} />
      </div>;
    }
    return (
      <div className="header">
          
        <h1>Drivers Championship</h1>
        <div className="div-flex">
        <div className="div-big">
        <table className="div-tab driverFont">
          <thead>
            <tr>
              <td className="borderRadius" colSpan="4">
                    Drivers Championship Standings - {this.state.season}
              </td>
            </tr>
          </thead>
          <tbody>
            {this.state.drivers.filter((val) => {
              if (this.props.propsSearch === "") {
                return val;
              } else if (
                val.Driver.givenName
                  .toLowerCase()
                  .includes(this.props.propsSearch.toLowerCase()) ||
                val.Driver.familyName
                  .toLowerCase()
                  .includes(this.props.propsSearch.toLowerCase()) ||
                val.Constructors[0].name
                  .toLowerCase()
                  .includes(this.props.propsSearch.toLowerCase())
              ) {
                return val;
              }
            }).map((driver, i) => {
              return (

                <tr key={i}>
                  <td>{driver.position}</td>
                  <td className="picCenter">
                    {this.state.flags.map((flag, i) => {
                      if (driver.Driver.nationality === flag.nationality) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                      if (
                        driver.Driver.nationality === "British" &&
                        flag.nationality === "British, UK"
                      ) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                      if (
                        driver.Driver.nationality === "Dutch" &&
                        flag.nationality === "Dutch, Netherlandic"
                      ) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                    })}
                    <Link to={`/driversDetails/${driver.Driver.driverId}`}>
                      {driver.Driver.givenName} {driver.Driver.familyName}
                    </Link>
                  </td>
                  <td>{driver.Constructors[0].name}</td>
                  <td>{driver.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
          </div>
        </div>
        </div>
    );
  }
}
