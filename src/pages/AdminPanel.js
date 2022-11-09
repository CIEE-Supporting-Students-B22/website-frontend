import React from "react";
import './styles/AdminPanel.css'
import ManagementBlock from "../components/ManagementBlock";

class AdminPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            data : [],
            loaded: false
        }
    }

    componentDidMount() {
        fetch('/pageTypes')
            .then(res => res.json())
            .then( (loadedData) => {
                this.setState({
                    loaded: true,
                    data: loadedData
                });
            }
        )
        }

    render() {
        return (
            <div>
                <h2>Current posts</h2>
                <div className="managed-pages">
                    <>
                        {this.state.data.map(d => <ManagementBlock title={d.title} postType={d.postType} />)}
                    </>
                </div>
            </div>
        )
    }
}

export default AdminPanel;