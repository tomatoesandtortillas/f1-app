import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


export default class Drivers extends React.Component {
    constructor() {
        super();
        this.state = {
            drivers: [],
            season: "",
            isLoaded: false
        };
    }
    componentDidMount() {
        this.getDrivers();
    }
    getDrivers() {
        var url = "http://ergast.com/api/f1/2013/driverStandings.json";
        $.get(url, (data) => {
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings, season: data.MRData.StandingsTable.season,
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
                            <td colSpan="4">Drivers Championship Standings - {this.state.season}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((driver, i) => {
                            return (
                                <tr key={i}>
                                    <td>{driver.position}</td>
                                    <td><Link to={`/driversDetails/${driver.Driver.driverId}`}>{driver.Driver.givenName} {driver.Driver.familyName}</Link></td>
                                    <td>{driver.Constructors[0].name}</td>
                                    <td>{driver.points}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        );
    }
}