import React from "react";
import * as $ from "jquery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";

export default class Races extends React.Component {
  constructor() {
    super();
    this.state = {
      races: [],
      isLoaded: false,
      flags: [],
    };
  }
  componentDidMount() {
    this.getRaces();
    this.getFlags();
  }
  getRaces() {
    var url = "http://ergast.com/api/f1/2013/results/1.json";
    $.get(url, (data) => {
      this.setState({
        races: data.MRData.RaceTable.Races,
        isLoaded: true,
      });
    });
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
    return (
      <div className="header">

        <table className="div-tab">
          <thead>
            <tr>
              <td colSpan="5">Race Calendar - 2013</td>
            </tr>
            <tr>
              <th>Round</th>
              <th>GrandPrix</th>
              <th>Circuit</th>
              <th>Date</th>
              <th>Winner</th>
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
                  <td>{race.Circuit.circuitName}</td>
                  <td>{race.date}</td>
                  <td className="picCenter">
                    {this.state.flags.map((flag, i) => {
                      if (
                        race.Results[0].Driver.nationality === flag.nationality
                      ) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                      if (
                        race.Results[0].Driver.nationality === "British" &&
                        flag.nationality === "British, UK"
                      ) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                      if (
                        race.Results[0].Driver.nationality === "Dutch" &&
                        flag.nationality === "Dutch, Netherlandic"
                      ) {
                        return <Flag key={i} country={flag.alpha_2_code} />;
                      }
                    })}
                    {race.Results[0].Driver.familyName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
