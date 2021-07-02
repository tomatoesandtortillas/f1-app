import React from "react";
import * as $ from "jquery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
export default class Teams extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
      isLoaded: false,
    };
  }
  componentDidMount() {
    this.getTeams();
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
  render() {
    if (!this.state.isLoaded) {
      return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
    }
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td colSpan="4">Constructor Championship Standings - 2013</td>
            </tr>
          </thead>
          <tbody>
            {this.state.teams.map((team, i) => {
              return (
                <tr key={i}>
                  <td>{team.position}</td>
                  <td>
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
