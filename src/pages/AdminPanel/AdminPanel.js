import React from "react";
import './AdminPanel.css'
import { ManagementBlock } from "../../components";

class AdminPanel extends React.Component {

    constructor() {
        super();
        this.state = {
            data : [],
            loaded: false,
            authorized: false
        }
    }

    componentDidMount() {
        fetch('/loggedIn').then( response => {
            if (response.status === 200) this.setState({
                loaded: this.state.loaded,
                data: this.state.data,
                authorized: true
            })
            else window.location.href = "/login";
        })

        fetch('/pageTypes')
            .then(res => res.json())
            .then( (loadedData) => {
                this.setState({
                    loaded: true,
                    data: loadedData,
                    authorized: this.state.authorized
                });
            }
        )
    }

    render() {
        if (this.state.authorized) return (
            <div>
                <h2>Current posts</h2>
                <div className="managed-pages">
                    <>
                        {this.state.loaded && this.state.authorized ? this.state.data.map(d => <ManagementBlock className="manageBlocks" key={d._id} title={d.title} postType={d.postType} />) :
                        <h1 style={{position: "absolute", left:0, right:0, marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Loading</h1>}
                    </>
                </div>
                <h2>Add page</h2>
                <>
                <form action="/adminAddPage" method="POST">
                    <input type="text" name="title" placeholder="Name of page" />
                    <button type="submit">Add Page</button>
                </form>
                </>
            </div>
        )
        else return <h1>Checking Authorization</h1>
    }
}

export default AdminPanel;