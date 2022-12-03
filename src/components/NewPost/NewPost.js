import React, {useState} from "react";
import {useParams} from "react-router-dom";
import "./NewPost.css";


export function NewPost(props) {
    const [allValues, setAllValues] = useState({
        postType: useParams().postType,
        title: '',
        shortDescription: '',
        numOfImages: 0,
        postImage: new File([], "", undefined)
    });
    const changeHandler = e => {
        if (e.target.files) {
            setAllValues({...allValues, [e.target.name]: e.target.files[0], numOfImages: e.target.files.length});
        }
        else setAllValues({...allValues, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in allValues) {
            formData.append(key, allValues[key]);
        }
        fetch('/addPost', {
            method: 'POST',
            body: formData
        }).then( r => r.json())
            .then(r => window.location.href = "/post/"+r._id)

    }


    return (
        <form className="new-post-submission">
            <label>Title:</label>
            <input type="text" name="title" onChange={changeHandler}/>
            <label>Image: </label>
            <input type="file" name="postImage" accept="image/png, image/jpeg" onChange={changeHandler}/>
            <label>Short Description:</label>
            <input type="text" name="shortDescription" onChange={changeHandler}/>
            <label>Full Description: </label>
            <textarea name="description" onChange={changeHandler}/>
            <button onClick={submitHandler}>Add post</button>
        </form>
    )
}
