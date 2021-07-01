import React from "react";
import * as $ from "jquery";

export default class DriverDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            driver: [],
            constructors: [],
            races: []
        }
    };

    componentDidMount() {
        this.getDriverDetails();
        this.getRaces();
    }

    getDriverDetails() {
        var url = `http://ergast.com/api/f1/2013/drivers/${this.props.match.params.id}/driverStandings.json`;
        $.get(url, (data) => {
            this.setState({
                driver: data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver,
                constructor: data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0]
            });
        }
        )
    };

    getRaces() {
        var url = `http://ergast.com/api/f1/2013/drivers/${this.props.match.params.id}/results.json`;
        $.get(url, (data) => {
            this.setState({
                races: data.MRData.RaceTable.Races
            });
        }
        )
    };

    render() {
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="2"><img alt="driver picture" src={`../assets/img/${this.state.driver.givenName}_${this.state.driver.familyName}.jpg`}></img>{this.state.driver.givenName} {this.state.driver.familyName}</td>
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
                                <td>link</td>
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
