import React from "react";
import './styles/ManagementBlock.css'

class ManagementBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('/removePost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    postType: this.props.postType,
                    value : this.state.value
                })
        })
    }

    render() {
        return (
            <div className="page-management">
                <h3>{this.props.title}</h3>
                <form onSubmit={this.handleSubmit}>
                    <select name="post" id={this.props.postType} onChange={this.handleChange}>
                    </select>
                    <button type="submit">Remove Post</button>
                </form>
            </div>
        )
    }

}

export default ManagementBlock;