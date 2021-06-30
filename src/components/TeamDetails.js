import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";

export default class TeamDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            team: [],
            isLoaded: false
            // constructors: [],
            // races: []
        }
    };

    componentDidMount() {
        this.getTeamDetails();
        this.getTeamResults();
        console.log("team", this.props.match.params.id);
    }

    getTeamDetails() {
        var url = `http://ergast.com/api/f1/2013/constructors/${this.props.match.params.id}/constructorStandings.json`
        $.get(url, (data) => {
            this.setState({
                team: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0],
                isLoaded: true
            });
        }
        )
    };

    getTeamResults() {
        var url = `http://ergast.com/api/f1/2013constructors/${this.props.match.params.id}/results.json`;
        $.get(url, (data) => {
            this.setState({
                results: data.MRData.RaceTable.Races
            });
        }
        )
    };

    render() {
        if (!this.state.isLoaded) {
            return (
                < Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                />
            );
        }
        return (
            <div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="2"><img alt="team logo" src={`../assets/img/teams/${this.state.team.Constructor.name.replace(` `,`_`)}.png`}></img>{this.state.team.Constructor.name}</td>
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
                                <td>url</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <div>
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
                                console.log("metoda races", this.state.races);

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
                </div> */}
            </div>
        );
    }
}