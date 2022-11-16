import React from "react";
import "./PostBlock.css";

class PostBlock extends React.Component {

    handleClick = e => {
        window.location = '/post/'+this.props._id;
    }

    render() {
        return (
            <div className="postDiv" onClick={this.handleClick}>
                <h3>{this.props.title}</h3>
                <p>{this.props.description}</p>
            </div>
        )
    }
}

export default PostBlock;