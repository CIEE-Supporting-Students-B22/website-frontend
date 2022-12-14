import React from "react";
import './ViewPosts.css';
import {PostBlock} from "../../components";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

class ViewPosts extends React.Component {

    constructor(props) {
        super(props);
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
                "postType": this.props.router.params.postType
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
                <h2>View Posts</h2>
                <div className="things-to-do-parent">
                    <>
                        {
                            this.state.loaded ? this.state.data.map(post => <PostBlock key={post._id} title={post.title} description={post.shortDescription} _id={post._id}/>) :
                                <h1 style={{position: "absolute", left:0, right:0, marginLeft: "auto", marginRight: "auto", textAlign: "center"}}>Loading</h1>
                        }
                    </>
                </div>
            </div>
        )
    }
}

//https://reactrouter.com/en/v6.3.0/faq
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter(ViewPosts);