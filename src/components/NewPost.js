import React, {useState} from "react";
import {useParams} from "react-router-dom";


export function NewPost(props) {
    const [allValues, setAllValues] = useState({
        postType: useParams().postType,
        title: '',
        description: ''
    });
    const changeHandler = e => setAllValues({...allValues, [e.target.name]: e.target.value});

    const submitHandler = e => {
        fetch('/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allValues)
        }).then( res => {
            if (res.ok) window.location.reload()
        })
        e.preventDefault();

    }


    return (
        <form>
            <label>Title: <input type="text" name="title" onChange={changeHandler}/></label>
            <label>Description: <input type="text" name="description" onChange={changeHandler}/></label>
            <button onClick={submitHandler}>Add post</button>
        </form>
    )
}
