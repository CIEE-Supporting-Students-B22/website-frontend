import React from "react";
import './ManagementBlock.css'
import {Link} from "react-router-dom";

class ManagementBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [],
            loaded: false,
            postType: this.props.postType
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.removePage = this.removePage.bind(this);
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
                    loaded: true,
                    postType: this.state.postType
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
        if (this.state.loaded) {
            window.location.href = "/editPost/"+this.state.value;
        }
    }

    removePage(event) {
        event.preventDefault();
        if (window.confirm("Are you sure you want to delete this page?") && this.state.loaded) {
            fetch('/adminRemovePage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "postType": this.state.postType
                })
            }).then(() => window.location.reload())
        }
    }

    render() {
        return (
            <div className="page-management">
                <h3>{this.props.title}</h3>
                <>
                    <form onSubmit={this.handleSubmit}>
                        <select style={{
                            color: "black",
                            fontFamily: "Verdana",
                            width: "200px"
                        }}name="post" id={this.props.postType} onChange={this.handleChange}>
                    {
                        this.state.data.map(d => <option key={d._id} value={d._id}>{d.title}</option>)
                    }
                        </select>
                        <br/>
                        {
                            this.state.value === '' ?
                                <>
                                    <button className="removePostButton" type="submit" disabled>Remove Post</button>
                                    <button className="editPostButton" onClick={this.handleEdit} disabled>Edit Post</button>
                                </>
                                :
                                <>
                                    <button type="submit" className="removePostButton">Remove Post</button>
                                    <button className="editPostButton" onClick={this.handleEdit}>Edit Post</button>
                                </>
                        }
                    </form>
                </>
                <Link to={"/newPost/"+this.props.postType}>
                    <button className="editPostButton">
                        Create new post
                </button></Link>
                {
                    this.state.value === '' ?
                        <>
                            <button className="removePostButton" onClick={this.removePage}>Remove Page</button>
                        </>
                        :
                        <>
                            <button className="removePostButton" onClick={this.removePage} disabled>Remove Page</button>
                        </>
                }
            </div>
        )
    }

}

export default ManagementBlock;