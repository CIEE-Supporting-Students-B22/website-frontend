import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "./NewPost.css";


export function NewPost(props) {
    const [allValues, setAllValues] = useState({
        postType: useParams().postType,
        title: '',
        shortDescription: ''
    });
    const changeHandler = e => setAllValues({...allValues, [e.target.name]: e.target.value});

    const submitHandler = e => {
        e.preventDefault();
        fetch('/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allValues)
        }).then( r => r.json())
            .then(r => window.location.href = "/post/"+r._id)

    }


    return (
        <form className="new-post-submission">
            <label For="title">Title:</label>
            <input type="text" name="title" onChange={changeHandler}/>
            <label>Short Description:</label>
            <input type="text" name="shortDescription" onChange={changeHandler}/>
            <label>Full Description: </label>
            <textarea name="description" onChange={changeHandler}/>
            <button onClick={submitHandler}>Add post</button>
        </form>
    )
}
