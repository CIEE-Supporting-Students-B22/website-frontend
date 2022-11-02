import React from "react";
import PostBlock from "../components/PostBlock";
import './styles/ThingToDo.css';

class ThingsToDo extends React.Component {

    render() {
        return(
            <div className="things-to-do-parent">
                <PostBlock title="Test" description="This is a test description" />
                <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
            </div>
        )
    }
}


export default ThingsToDo;