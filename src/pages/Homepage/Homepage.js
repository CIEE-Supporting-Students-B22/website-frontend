import React from "react";
import './Homepage.css';
import { Link } from "react-router-dom";

class Homepage extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loaded: false
        }
    }

    //load page
    componentDidMount() {
        fetch('/pageTypes') //request to server, asynchronous
            .then(res => res.json()) //parser
            .then( links => {
                this.setState({
                    data: links,
                    loaded: true
                })
            })
    }

    render() {
        return (
            <div className="homepage-parent">
                <>
                    {   //creating tags
                        this.state.loaded ? this.state.data.map(post => <Link className="homepage-links" key={post._id} to={"/view-posts/"+post.postType}>{post.title}</Link>) :
                            <h1 style={{position: "absolute", left:0, right:0, marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Loading</h1>
                    }
                </>
                <Link className="homepage-links" to="/admin-panel">Admin Panel</Link>
            </div>
        );
    }
}

export default Homepage;