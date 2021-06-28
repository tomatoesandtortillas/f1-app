import React from "react";
import * as $ from "jquery";

export default class Races extends React.Component {

    constructor() {
        super();
        this.state = {
            races: []
        };
    }
    componentDidMount(){
        this.getRaces();
    };
    getRaces() {
        var url = "http://ergast.com/api/f1/2013/results/1.json";
        $.get(url, (data) => {
            this.setState({races: data.MRData.RaceTable.Races});
            console.log("races", this.state.races);
        })
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td colSpan="4">Race Calendar - 2013</td>
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
                                    <td>{race.raceName}</td>
                                    <td>{race.Circuit.circuitName}</td>
                                    <td>{race.date}</td>
                                    <td>{race.Results[0].Driver.familyName}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>

        );
    }
}
