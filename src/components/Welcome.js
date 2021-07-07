import React from "react";


export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome-page" style={{
                backgroundImage: "url(" + "../assets/img/frontPage.jpg" + ")",
            }}>
            </div>
        );
    }

};