import React from "react";
import PostBlock from "../components/PostBlock";
import './styles/ThingToDo.css';

class ThingsToDo extends React.Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loaded: false
        }
    }

    componentDidMount() {
        fetch('/getPosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "postType": 'things-to-do'
            })
        }).then(res => res.json())
            .then( posts => {
                this.setState({
                    data: posts,
                    loaded: true
                })
            })
    }

    render() {
        return(
            <div>
                <h2>Things to do in Prague</h2>
                <div className="things-to-do-parent">
                    <>
                        {
                            this.state.loaded ? this.state.data.map(post => <PostBlock title={post.title} description={post.description} />) :
                                <h1 style={{position: "absolute", left:0, right:0, marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Loading</h1>
                        }
                    </>
                </div>
            </div>
        )
    }
}


export default ThingsToDo;