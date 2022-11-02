import React from "react";
import './styles/Homepage.css';
import { Link } from "react-router-dom";

class Homepage extends React.Component {

    render() {
        return (
            <div className="homepage-parent">
                <Link className="column-div" to="/things-to-do">Things to do</Link>
                <div className="column-div">Language Prep</div>
                <div className="column-div">Utilizing Services in the Czech Republic</div>
                <div className="column-div">Upcoming trips offered by CIEE Prague</div>
            </div>
        );
    }
}

export default Homepage;