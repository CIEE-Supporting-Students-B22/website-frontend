import React, {useEffect, useState} from "react";
import "./DetailedPost.css";
//import exampleImage from "../../assets/Site T-Shirt_Prague.png";
import {useParams} from "react-router-dom";

export function DetailedPost(props) {
    const id = useParams().id;

    const [postData, setPostData] = useState({});

    useEffect(() => {
        fetch('/getPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "_id": id
            })
        }).then(data => data.json())
            .then(d => setPostData(d))
    }, [])

    return (
        <div className="">
            <h1>{postData.title}</h1>
            <h3>{postData.shortDescription}</h3>
            <img className="detailed-image" src={"/getImage?_id="+id} alt="Example" width="25%"/>
            <p>{postData.description}</p>
        </div>
    )
}

