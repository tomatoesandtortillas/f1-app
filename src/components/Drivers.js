import React from "react";
import * as $ from "jquery";

export default class Drivers extends React.Component {
    constructor() {
        super();
        this.state = {
            drivers: [],
            season: ""
        };
    }
    displayDriverDetails() {
    };
    componentDidMount() {
        this.getDrivers();
    }
    getDrivers() {
        var url = "http://ergast.com/api/f1/2013/driverStandings.json";
        $.get(url, (data) => {
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings, season: data.MRData.StandingsTable.season
            });
        })
    }
    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td colSpan="4">Drivers Championship Standings - {this.state.season}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((driver, i) => {
                            return (
                                <tr key={i}>
                                    <td>{driver.position}</td>
                                    <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}