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
                        this.state.loaded ? this.state.data.map(post => <Link className="column-div" key={post._id} to={"/view-posts/"+post.postType}>{post.title}</Link>) :
                            <h1 style={{position: "absolute", left:0, right:0, marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Loading</h1>
                    }
                </>
                <Link className="column-div" to="/admin-panel">Admin Panel (Temporary for Development Purposes)</Link>
                {/*
                <Link className="column-div" to="/view-posts/things-to-do">Things to do</Link>
                <Link className="column-div" to="/view-posts/language-prep">Language Prep</Link>
                <Link className="column-div" to="/view-posts/using-services">Utilizing Services in the Czech Republic</Link>
                <Link className="column-div" to="/view-posts/upcoming-trips">Upcoming trips offered by CIEE Prague</Link>
                <Link className="column-div" to="/admin-panel">Admin Panel (Temporary for Development Purposes)</Link>
                */}
            </div>
        );
    }
}

export default Homepage;