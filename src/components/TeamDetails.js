import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Flag from "react-flagkit";

export default class TeamDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      team: [],
      results: [],
      flags: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    this.getTeamDetails(this.props.match.params.id);
    
  }
  getTeamDetails(id) {
    var urlTeamDetails = $.ajax(
      `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`
    );
    var urlTeamResults = $.ajax(
      `http://ergast.com/api/f1/2013/constructors/${id}/results.json`
    );
    var urlFlag = $.ajax(
      `https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
    );

    $.when(urlTeamDetails, urlTeamResults, urlFlag).done(
      function (dataTeamDetails, dataTeamResults, dataflags) {
        this.setState({
          team: dataTeamDetails[0].MRData.StandingsTable.StandingsLists[0]
            .ConstructorStandings[0],
          results: dataTeamResults[0].MRData.RaceTable,
          flags: JSON.parse(dataflags[0]),
          isLoaded: true,
        });
      }.bind(this)
    );
  }
  
  render() {
    if (!this.state.isLoaded) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }
    console.log(this.state.team.Constructor.name);
    return (
      <div>
        <div>
                  <img
                    alt="team logo"
                    src={`../assets/img/teams/${this.state.team.Constructor.name.replace(
                      ` `,
                      `_`
                    )}.png`}
                  ></img>
          <table>
            <thead>
              <tr>
                <td colSpan="2">
                  {this.state.team.Constructor.name}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Country:</td>
                <td>{this.state.team.Constructor.nationality}</td>
              </tr>
              <tr>
                <td>Position:</td>
                <td>{this.state.team.position}</td>
              </tr>
              <tr>
                <td>Points:</td>
                <td>{this.state.team.points}</td>
              </tr>
              <tr>
                <td>History:</td>
                <td>
                  <a href={this.state.team.Constructor.url} target="_blank">
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
                <th colSpan="2">GrandPrix</th>
                <th>
                  {this.state.results.Races[0].Results[0].Driver.familyName}
                </th>
                <th>
                  {this.state.results.Races[0].Results[1].Driver.familyName}
                </th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {this.state.results.Races.map((race, i) => {
                return (
                  <tr key={i}>
                    <td>{race.round}</td>
                    <td>
                      {this.state.flags.map((flag, i) => {
                        
                        if (race.Circuit.Location.country === flag.en_short_name) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                        if (race.Circuit.Location.country === "UK" &&
                          flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                        if (race.Circuit.Location.country === "Korea" &&
                          flag.en_short_name === "Korea (Democratic People's Republic of)") {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }  
                      })}
                    </td>
                    <td>{race.raceName}</td>
                    <td>{race.Results[0].position}</td>
                    <td>{race.Results[1].position}</td>
                    <td>
                      {parseInt(race.Results[0].points) +
                        parseInt(race.Results[1].points)}
                    </td>
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
