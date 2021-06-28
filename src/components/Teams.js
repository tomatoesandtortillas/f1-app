import React from "react";
import * as $ from "jquery";

export default class Teams extends React.Component {


    constructor() {
        super();
        this.state = {
            teams: []
        };


    }
    componentDidMount() {
        this.getTeams();
    }
    getTeams() {
        var url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        $.get(url, (data) => {
            this.setState({
                teams: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
            });
            console.log(this.state.teams);
        })
    }
    render() {
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
                                    <td>{team.Constructor.name}</td>
                                    <td>Details {team.Constructor.url}</td>
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