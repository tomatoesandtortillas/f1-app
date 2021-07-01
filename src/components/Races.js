import React from "react";
import * as $ from "jquery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import {Link} from "react-router-dom";


export default class Races extends React.Component {
    constructor() {
        super();
        this.state = {
            races: [],
            isLoaded: false
        };
    }
    componentDidMount() {
        this.getRaces();
    };
    getRaces() {
        var url = "http://ergast.com/api/f1/2013/results/1.json";
        $.get(url, (data) => {
            this.setState({
                races: data.MRData.RaceTable.Races,
                isLoaded: true
            });
        })
    }
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
                                    <td><Link to={`/raceDetails/${race.round}`}>{race.raceName}</Link></td>
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
