import React from "react";
import './ManagementBlock.css'
import {Link} from "react-router-dom";

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
        this.handleEdit = this.handleEdit.bind(this);
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
            fetch('/adminRemovePost', {
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

    handleEdit(event) {
        event.preventDefault();
        console.log(this.state);
        if (this.state.loaded) {
            window.location.href = "/editPost/"+this.state.value;
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
                        this.state.data.map(d => <option key={d._id} value={d._id}>{d.title}</option>)
                    }
                        </select>
                        {
                            this.state.value === '' ?
                                <>
                                    <button type="submit" disabled>Remove Post</button>
                                    <button onClick={this.handleEdit} disabled>Edit Post</button>
                                </>
                                :
                                <>
                                    <button type="submit">Remove Post</button>
                                    <button onClick={this.handleEdit}>Edit Post</button>
                                </>
                        }
                    </form>
                </>
                <Link to={"/newPost/"+this.props.postType}>Create new post</Link>
            </div>
        )
    }

}

export default ManagementBlock;