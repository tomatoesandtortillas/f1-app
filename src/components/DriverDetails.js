import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";

export default class DriverDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      driver: [],
      constructors: [],
      races: [],
      isLoaded: false,
      flags: []
    };
    this.changeColor = this.changeColor.bind(this);
  }
  changeColor = (position) => {
    
    // let pos;
    var color = "";
    switch(position) {
      case 1:
        color = "#047a73";
        break;
      case 2:
        color = "#ff0000";
        break;
      case 3:
        color = "#eeb647";
        break;
      case 4:
        color = "#ff9100";
        break;
      case 5:
        color = "#ff9e00";
        break;
      default:
        color = "#c0c0c0";
    }
    return color;
  }
  componentDidMount() {
    this.getDriverDetails(this.props.match.params.id);
  }

  getDriverDetails(id) {
    var urlDriversDetails = $.ajax(
      `http://ergast.com/api/f1/2013/drivers/${id}/driverStandings.json`
    );
    var urlDriversRaces = $.ajax(
      `http://ergast.com/api/f1/2013/drivers/${id}/results.json`
    );
    var urlFlag = $.ajax(
      `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
    );

    $.when(urlDriversDetails, urlDriversRaces, urlFlag).done(
      function (dataDriversDetails, dataDriversRaces, dataFlags) {
        this.setState({
          driver:
            dataDriversDetails[0].MRData.StandingsTable.StandingsLists[0]
              .DriverStandings[0].Driver,
          constructor:
            dataDriversDetails[0].MRData.StandingsTable.StandingsLists[0]
              .DriverStandings[0].Constructors[0],
          races: dataDriversRaces[0].MRData.RaceTable.Races,
          flags: JSON.parse(dataFlags[0]),
          isLoaded: true,
        });
      }.bind(this)
    );
  }

  render() {
    if (!this.state.isLoaded) {
      return <div className="loader">
        <Loader type="Puff" color="#3c6e71ff" height={100} width={100} />
      </div>;
    }

    return (
      <div className="div-flex" >
        <div className="div-small">
          

            <div className="driverPic">
              <img
                alt="driver picture"
                src={`../assets/img/${this.state.driver.givenName
                  }_${this.state.driver.familyName.replaceAll(` `, `_`)}.jpg`}
              ></img>
            </div>

            <div className="flags">
              {this.state.driver.givenName} {this.state.driver.familyName}
              {this.state.flags.map((flag, i) => {
                if (this.state.driver.nationality === flag.nationality) {
                  return <Flag key={i} country={flag.alpha_2_code} />;
                }
                if (
                  this.state.driver.nationality === "British" &&
                  flag.nationality === "British, UK"
                ) {
                  return <Flag key={i} country={flag.alpha_2_code} />;
                }
                if (
                  this.state.driver.nationality === "Dutch" &&
                  flag.nationality === "Dutch, Netherlandic"
                ) {
                  return <Flag key={i} country={flag.alpha_2_code} />;
                }
              })}             
            </div>

          <div className="div-details" >
            <table>
              <tbody>
                <tr>
                  <td>Country:</td>
                  <td>{this.state.driver.nationality}</td>
                </tr>
                <tr>
                  <td>Team:</td>
                  <td>{this.state.constructor.name}</td>
                </tr>
                <tr>
                  <td>Birth:</td>
                  <td>{this.state.driver.dateOfBirth}</td>
                </tr>
                <tr>
                  <td>Biography:</td>
                  <td>
                    <a href={this.state.driver.url} target="_blank" >
                      <FontAwesomeIcon color="rgb(79, 136, 139)" icon={faExternalLinkAlt} />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="div-big">
          <table className="div-tab">
            <thead>
              <tr>
                <td className="borderRadius" colSpan="5">Formula 1 2013 Results</td>
              </tr>
              <tr>
                <th>Round</th>
                <th>GrandPrix</th>
                <th>Team</th>
                <th>Grid</th>
                <th>Race</th>
              </tr>
            </thead>
            <tbody>
              {this.state.races.map((race, i) => {
                
                return (
                  <tr key={i}>
                    <td>{race.round}</td>
                    <td className="picCenter">
                      {this.state.flags.map((flag, i) => {
                        if (
                          race.Circuit.Location.country === flag.en_short_name
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        } else if (
                          race.Circuit.Location.country == "UK" &&
                          flag.en_short_name ==
                          "United Kingdom of Great Britain and Northern Ireland"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        } else if (
                          race.Circuit.Location.country == "Korea" &&
                          flag.en_short_name ==
                          "Korea (Democratic People's Republic of)"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        } else if (
                          race.Circuit.Location.country == "UAE" &&
                          flag.en_short_name == "United Arab Emirates"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        } else if (
                          race.Circuit.Location.country == "USA" &&
                          flag.en_short_name == "United States of America"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                      })}

                      <Link to={`/raceDetails/${race.round}`}>
                        {race.raceName}
                      </Link>
                    </td>
                    <td>{race.Results[0].Constructor.name}</td>
                    <td>{race.Results[0].grid}</td>
                    <td
                    style={{backgroundColor:this.changeColor(parseInt(race.Results[0].position))}}
                    >{race.Results[0].position}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
