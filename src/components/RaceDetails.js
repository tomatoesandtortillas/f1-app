import React from "react";
import * as $ from "jquery";

export default class RaceDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            raceResults:[],
            raceQualification:[]
        }
    };
    componentDidMount(){
        this.getRaceDetails(this.props.match.params.id);
        
    };
    getRaceDetails(id) {
        
        var urlRaceQualification = $.ajax(`http://ergast.com/api/f1/2013/${id}/qualifying.json`);
        var urlRaceResults = $.ajax(`http://ergast.com/api/f1/2013/${id}/results.json`);

        $.when(urlRaceQualification,urlRaceResults).done(
            function(dataRaceQualification,dataRaceResults){
                console.log("link",dataRaceResults);
                console.log("kvalif",dataRaceQualification);
                this.setState({
                     raceQualification: dataRaceQualification[0].MRData.RaceTable.Races[0],
                     raceResults: dataRaceResults[0].MRData.Races.Races[0]
                });
            }
        )   
    }
    render () {
        return (
            <div>
                
            </div>
        );

    }
}
