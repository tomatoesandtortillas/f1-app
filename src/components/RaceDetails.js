import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";

export default class RaceDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      raceResults: [],
      raceQualification: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    this.getRaceDetails(this.props.match.params.id);
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
  render() {
    if (!this.state.isLoaded) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }

    return (
      <div>
        <img alt="race picture" src={`...`}></img>
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
                <a href={this.state.raceQualification.Circuit.url}>link</a>
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          <table>
            <thead>
              <tr>
                <td>Qualifying Results</td>
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
                      <td>{driver.Driver.driverId}</td>
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
          <table>
            <thead>
              <tr>
                <th>Race Results</th>
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
                    <td>{raceResult.Driver.familyName}</td>
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
