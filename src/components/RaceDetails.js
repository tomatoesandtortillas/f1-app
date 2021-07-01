import React from "react";
import * as $ from "jquery";

export default class RaceDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            race:[],
            urlRaceQualification:[]
        }
    };
    componentDidMount(){
        this.getRaceDetails(this.props.match.params.id);
    };
    getRaceDetails(id) {
        
        var urlRaceQualification = $.ajax(`http://ergast.com/api/f1/2013/${id}/results.json`);
        
        $.when(urlRaceQualification).done()
    }
    render () {
        return (
            <div>

            </div>
        );

    }
}
