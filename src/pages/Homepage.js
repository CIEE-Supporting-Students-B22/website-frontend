import React from "react";
import './styles/Homepage.css';
import { Link } from "react-router-dom";

class Homepage extends React.Component {

    render() {
        return (
            <div className="homepage-parent">
                <Link className="column-div" to="/things-to-do">Things to do</Link>
                <Link className="column-div" to="/language-prep">Language Prep</Link>
                <Link className="column-div" to="/using-services">Utilizing Services in the Czech Republic</Link>
                <Link className="column-div" to="/upcoming-trips">Upcoming trips offered by CIEE Prague</Link>
            </div>
        );
    }
}

export default Homepage;