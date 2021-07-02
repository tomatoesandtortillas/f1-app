import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Flag from "react-flagkit";

export default class RaceDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      raceResults: [],
      raceQualification: [],
      isLoaded: false,
      flags: [],
    };
  }
  componentDidMount() {
    this.getRaceDetails(this.props.match.params.id);
    this.getFlags();
  }
  getRaceDetails(id) {
    var urlRaceQualification = $.ajax(
      `http://ergast.com/api/f1/2013/${id}/qualifying.json`
    );
    var urlRaceResults = $.ajax(
      `http://ergast.com/api/f1/2013/${id}/results.json`
    );

    $.when(urlRaceQualification, urlRaceResults).done(
      function (dataRaceQualification, dataRaceResults) {
        this.setState({
          raceQualification: dataRaceQualification[0].MRData.RaceTable.Races[0],
          raceResults: dataRaceResults[0].MRData.RaceTable.Races[0].Results,
          isLoaded: true,
        });
      }.bind(this)
    );
  }

  getFlags() {
    var urlFlag =
      "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    $.get(urlFlag, (data) => {
      let flags = JSON.parse(data);
      this.setState({
        flags: flags,
      });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }

    console.log(this.state.raceQualification.Circuit.Location.country);
    console.log(this.state.flags);
    return (
      <div>
        {/* <img alt="race picture" src={`...`} /> */}
        <div>
          {this.state.flags.map((flag, i) => {
            console.log(this.state.raceQualification.Circuit.Location.country);
            if (
              this.state.raceQualification.Circuit.Location.country ===
              flag.en_short_name
            ) {
              return <Flag key={i} country={flag.alpha_2_code} size={200} />;
            } else if (
              this.state.raceQualification.Circuit.Location.country == "UK" &&
              flag.en_short_name ==
                "United Kingdom of Great Britain and Northern Ireland"
            ) {
              return <Flag key={i} country={flag.alpha_2_code} size={200} />;
            } else if (
              this.state.raceQualification.Circuit.Location.country ==
                "Korea" &&
              flag.en_short_name == "Korea (Democratic People's Republic of)"
            ) {
              return <Flag key={i} country={flag.alpha_2_code} size={200} />;
            } else if (
              this.state.raceQualification.Circuit.Location.country == "UAE" &&
              flag.en_short_name == "United Arab Emirates"
            ) {
              return <Flag key={i} country={flag.alpha_2_code} size={200} />;
            } else if (
              this.state.raceQualification.Circuit.Location.country == "USA" &&
              flag.en_short_name == "United States of America"
            ) {
              return <Flag key={i} country={flag.alpha_2_code} size={200} />;
            }
          })}
        </div>

        <table>
          <thead>
            <tr>
              <td colSpan="2">{this.state.raceQualification.raceName}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Country:</td>
              <td>{this.state.raceQualification.Circuit.Location.country}</td>
            </tr>
            <tr>
              <td>Location:</td>
              <td>{this.state.raceQualification.Circuit.Location.locality}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{this.state.raceQualification.date}</td>
            </tr>
            <tr>
              <td>Full Report:</td>
              <td>
                <a
                  href={this.state.raceQualification.Circuit.url}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <table className="div-tab">
            <thead>
              <tr>
                <td colSpan="4">Qualifying Results</td>
              </tr>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best Time</th>
              </tr>
            </thead>
            <tbody>
              {this.state.raceQualification.QualifyingResults.map(
                (driver, i) => {
                  let min = [];
                  min.push(driver.Q1);
                  min.push(driver.Q2);
                  min.push(driver.Q3);
                  let bestTime = min.sort();

                  return (
                    <tr key={i}>
                      <td>{driver.position}</td>
                      <td>
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
                        {driver.Driver.familyName}
                      </td>
                      <td>{driver.Constructor.name}</td>
                      <td>{bestTime[0]}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
        <div>
          <table className="div-tab">
            <thead>
              <tr>
                <th colSpan="5">Race Results</th>
              </tr>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Results</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {this.state.raceResults.map((raceResult, i) => {
                return (
                  <tr key={i}>
                    <td>{raceResult.position}</td>
                    <td>
                      {this.state.flags.map((flag, i) => {
                        if (
                          raceResult.Driver.nationality === flag.nationality
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                        if (
                          raceResult.Driver.nationality === "British" &&
                          flag.nationality === "British, UK"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                        if (
                          raceResult.Driver.nationality === "Dutch" &&
                          flag.nationality === "Dutch, Netherlandic"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                      })}
                      {raceResult.Driver.familyName}
                    </td>
                    <td>{raceResult.Constructor.name}</td>
                    <td>
                      {raceResult.Time !== undefined
                        ? raceResult.Time.time
                        : ""}
                    </td>
                    <td>{raceResult.points}</td>
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
