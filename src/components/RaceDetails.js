import React from "react";
import * as $ from "jquery";
import Loader from "react-loader-spinner";
import Flag from 'react-flagkit';

export default class RaceDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            raceResults: [],
            raceQualification: [],
            isLoaded: false
        }
    };
    componentDidMount() {
        this.getRaceDetails(this.props.match.params.id);

    };
    getRaceDetails(id) {

        var urlRaceQualification = $.ajax(`http://ergast.com/api/f1/2013/${id}/qualifying.json`);
        var urlRaceResults = $.ajax(`http://ergast.com/api/f1/2013/${id}/results.json`);

        $.when(urlRaceQualification, urlRaceResults).done(
            function (dataRaceQualification, dataRaceResults) {
                console.log("link", dataRaceResults);
                console.log("kvalif", dataRaceQualification);
                this.setState({
                    raceQualification: dataRaceQualification[0].MRData.RaceTable.Races[0],
                    raceResults: dataRaceResults[0].MRData.RaceTable.Races[0],
                    isLoaded: true
                });
            }.bind(this)
        );
    }
    render() {
        if (!this.state.isLoaded) {
            return <Loader type="Puff" color="#00BFFF" height={100} width={100} />;
        }
        return (
            <div>
                <div>
                    <div>
                     zastava

                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td colSpan="2">
                                    {this.state.raceQualification.raceName}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Country:</td>
                                <td>{this.state.raceQualification.Circuit.Location.country}</td>
                            </tr>
                            <tr>
                                <td>Location:</td>
                                <td>{this.state.raceQualification.Circuit.Location.locality}</td>
                            </tr>
                            <tr>
                                <td>Date:</td>
                                <td>{this.state.raceQualification.date}</td>
                            </tr>
                            <tr>
                                <td>Full Report:</td>
                                <td><a href={this.state.raceQualification.Circuit.url}>link</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>

                </div>
                <div>

                </div>
            </div>
        );

    }
}
