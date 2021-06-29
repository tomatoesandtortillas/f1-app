import React from "react";
import * as $ from "jquery";

export default class DriverDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            drivers: []
        };
    }

    componentDidMount() {
        this.getDriverDetails();
    }

    getDriverDetails() {
        var url = "http://ergast.com/api/f1/2013/drivers/0/driverStandings.json";
        $.get(url, (data) => {
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            });
            console.log("drivers", this.state.drivers);
        })

    }
    render() {
        return (
            <div>
                <table>
                    {/* <thead>
                        <tr>
                            <td colSpan="2"><img alt="driver picture" src="./img/Sebastian_Vettel.jpg"></img> {driver.Driver.givenName} {driver.Driver.familyName}</td>
                        </tr>
                    </thead> */}
                    
                    {this.state.drivers.map((driver, i) => {
                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>Country:</td>
                                    <td>{driver.Driver.nationality}</td>
                                </tr>
                                <tr>
                                    <td>Team:</td>
                                    <td>{driver.Constructors[0].name}</td>
                                </tr>
                                <tr>
                                    <td>Birth:</td>
                                    <td>{driver.Driver.dateOfBirth}</td>
                                </tr>
                                <tr>
                                    <td>Biography:</td>
                                    <td>link</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        );
    }
}