import React from "react";
import "./ServiceBlock.css";

export class ServiceBlock extends React.Component {

    render() {
        return (
            <div className="postDiv">
                <h3>{this.props.title}</h3>
                <p>Video goes here - TBD how it is presented and hosted.</p>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default ServiceBlock;