import React from "react";
import * as $ from "jquery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import Flag from "react-flagkit";

export default class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      isLoaded: false,
      flags: [],
    };
  }
  componentDidMount() {
    this.getTeams();
    this.getFlags();
  }
  getTeams() {
    var url = "http://ergast.com/api/f1/2013/constructorStandings.json";
    $.get(url, (data) => {
      this.setState({
        teams:
          data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
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
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      </div>;
    }
    return (
      <div className="main">
        <h1 className="mainTitle">Constructions Championship</h1>
        <table className="div-tab driverFont">
          <thead>
            <tr>
              <td className="borderRadius" colSpan="4">Constructor Championship Standings - 2013</td>
            </tr>
          </thead>
          <tbody>
            {this.state.teams.map((team, i) => {
              return (
                <tr key={i}>
                  <td>{team.position}</td>
                  <td className="picCenter">
                    {this.state.flags.map((flag, i) => {
                      if (team.Constructor.nationality === flag.nationality) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                      if (
                        team.Constructor.nationality === "British" &&
                        flag.nationality === "British, UK"
                      ) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                    })}
                    <Link to={`/teamDetails/${team.Constructor.constructorId}`}>
                      {" "}
                      {team.Constructor.name}
                    </Link>
                  </td>
                  <td>
                    Details{" "}
                    <a href={team.Constructor.url} target="_blank">
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </a>
                  </td>
                  <td>{team.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
