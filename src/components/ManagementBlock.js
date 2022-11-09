import React from "react";
import './styles/ManagementBlock.css'

class ManagementBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
            loaded: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/getPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "postType": this.props.postType
            })
        }).then(res => res.json())
            .then( options => {
                this.setState({
                    value: options.length>0 ? options[0]._id : this.state.value,
                    data: options,
                    loaded: true
                })
            })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.loaded) {
            fetch('/removePost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: this.state.value
                })
            }).then( res => {
                if (res.ok) window.location.reload()
            })
        }
    }

    render() {
        return (
            <div className="page-management">
                <h3>{this.props.title}</h3>
                <>
                    <form onSubmit={this.handleSubmit}>
                        <select name="post" id={this.props.postType} onChange={this.handleChange}>
                    {
                        this.state.data.map(d => <option value={d._id}>{d.title}</option>)
                    }
                        </select>
                        <button type="submit">Remove Post</button>
                    </form>
                </>
            </div>
        )
    }

}

export default ManagementBlock;