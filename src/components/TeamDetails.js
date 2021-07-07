import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import Flag from "react-flagkit";

import { Link } from "react-router-dom";

export default class TeamDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      team: [],
      results: [],
      flags: [],
      isLoaded: false,
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
      return <div className="loader">
        <Loader type="Puff" color="#3c6e71ff" height={100} width={100} />
      </div>;
    }
    console.log(this.state.team.Constructor.name);
    return (
      <div className="div-flex" >
        <div className="div-small">

          <div className="teamLogo">
            <img
              alt="team logo"
              src={`../assets/img/teams/${this.state.team.Constructor.name.replace(` `, `_`)}.png`}
            ></img>
          </div>
          
          <div className="flags">
            {this.state.team.Constructor.name}
            {this.state.flags.map((flag, i) => {
              if (this.state.team.Constructor.nationality === flag.nationality) {
                return <Flag key={i} country={flag.alpha_2_code} />;
              }
              if (
                this.state.team.Constructor.nationality === "British" &&
                flag.nationality === "British, UK"
              ) {
                return <Flag key={i} country={flag.alpha_2_code} />;
              }
            })}
          </div>
         


          <div className="div-details">
            <table>
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
                <td className="borderRadius" colSpan="6">Formula 1 2013 Results</td>
              </tr>
              <tr>
                <th>Round</th>
                <th>GrandPrix</th>
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
                    <td className="picCenter">
                      {this.state.flags.map((flag, i) => {
                        if (
                          race.Circuit.Location.country === flag.en_short_name
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                        if (
                          race.Circuit.Location.country === "UK" &&
                          flag.en_short_name ===
                          "United Kingdom of Great Britain and Northern Ireland"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                        if (
                          race.Circuit.Location.country === "Korea" &&
                          flag.en_short_name ===
                          "Korea (Democratic People's Republic of)"
                        ) {
                          return <Flag key={i} country={flag.alpha_2_code} />;
                        }
                      })}
                      <Link to={`/raceDetails/${race.round}`}>
                        {race.raceName}
                      </Link>
                    </td>
                    <td
                    style={{backgroundColor:this.changeColor(parseInt(race.Results[0].position))}}
                    >{race.Results[0].position}</td>
                    <td
                    style={{backgroundColor:this.changeColor(parseInt(race.Results[1].position))}}
                    >{race.Results[1].position}</td>
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
