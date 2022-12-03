import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./EditPost.css";


export function EditPost(props) {

    const [initData, setInitData] = useState({
        _id: useParams().id,
        postType: '',
        title: '',
        shortDescription: '',
        description: '',
        loaded: false
    })

    useEffect(() => {
        fetch('/getPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "_id": initData._id
            })
        }).then(data => data.json())
            .then(d => {
                setInitData(d)
            }).then(console.log(initData))
    }, [])

    const changeHandler = e => {
        if (e.target.files) {
            setInitData({...initData, [e.target.name]: e.target.files[0]});
        }
        else setInitData({...initData, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();
        let formData = new FormData();
        for (let key in initData) {
            formData.append(key, initData[key]);
        }
        fetch('/editPost', {
            method: 'POST',
            body: formData
        }).then( r => r.json())
            .then(r => window.location.href = "/post/"+r._id)

    }


    return (
        <form className="new-post-submission">
            <label>Title:</label>
            <input type="text" name="title" defaultValue={initData.title} onChange={changeHandler}/>
            <label>Replace Image: </label>
            <input type="file" name="postImage" accept="image/png, image/jpeg" onChange={changeHandler}/>
            <label>Short Description:</label>
            <input type="text" name="shortDescription" value={initData.shortDescription} onChange={changeHandler}/>
            <label>Full Description: </label>
            <textarea name="description" value={initData.description} onChange={changeHandler}/>
            <button onClick={submitHandler}>Edit post</button>
        </form>
    )
}
