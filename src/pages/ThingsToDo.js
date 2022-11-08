import React from "react";
import PostBlock from "../components/PostBlock";
import './styles/ThingToDo.css';

class ThingsToDo extends React.Component {

    render() {
        return(
            <div>
                <h2>Things to do in Prague</h2>
                <div className="things-to-do-parent">
                    {/*Placeholders*/}
                    <PostBlock title="Test" description="This is a test description" />
                    <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                    <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                    <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                    <PostBlock title="A Cool Place" description="This is another cool place being offered by CIEE. You should go here." />
                </div>
            </div>
        )
    }
}


export default ThingsToDo;