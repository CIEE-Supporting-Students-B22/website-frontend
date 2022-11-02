import React from "react";
import "./styles/PostBlock.css";

class PostBlock extends React.Component {

    render() {
        return (
            <div className="postDiv">
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default PostBlock;