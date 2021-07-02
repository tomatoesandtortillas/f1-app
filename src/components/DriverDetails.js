import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
export default class DriverDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      driver: [],
      constructors: [],
      races: [],
      isLoaded: false,
    };
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

    $.when(urlDriversDetails, urlDriversRaces).done(
      function (dataDriversDetails, dataDriversRaces) {
        this.setState({
          driver:
            dataDriversDetails[0].MRData.StandingsTable.StandingsLists[0]
              .DriverStandings[0].Driver,
          constructor:
            dataDriversDetails[0].MRData.StandingsTable.StandingsLists[0]
              .DriverStandings[0].Constructors[0],
          races: dataDriversRaces[0].MRData.RaceTable.Races,
          isLoaded: true,
        });
      }.bind(this)
    );
  }
  //     $.get(url, (data) => {
  //       this.setState({
  //         driver:
  //           data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
  //             .Driver,
  //         constructor:
  //           data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
  //             .Constructors[0],
  //       });
  //     });
  //   }

  //   getRaces() {
  //     var url = `http://ergast.com/api/f1/2013/drivers/${this.props.match.params.id}/results.json`;
  //     $.get(url, (data) => {
  //       this.setState({
  //         races: data.MRData.RaceTable.Races,
  //       });
  //     });
  //   }

  render() {
    if (!this.state.isLoaded) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }

    return (
      <div>
        <div>
          <img
            alt="driver picture"
            src={`../assets/img/${
              this.state.driver.givenName
            }_${this.state.driver.familyName.replaceAll(` `, `_`)}.jpg`}
          ></img>
          <table>
            <thead>
              <tr>
                <td colSpan="2">
                  {this.state.driver.givenName} {this.state.driver.familyName}
                </td>
              </tr>
            </thead>
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
                  <a href={this.state.driver.url} target="_blank">
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <td>Formula 1 2013 Results</td>
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
                    <td>{race.raceName}</td>
                    <td>{race.Results[0].Constructor.name}</td>
                    <td>{race.Results[0].grid}</td>
                    <td>{race.Results[0].position}</td>
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
