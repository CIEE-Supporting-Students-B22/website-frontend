import React, {useEffect, useState} from "react";
import "./DetailedPost.css";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export function DetailedPost(props) {
    const id = useParams().id;

    const [postData, setPostData] = useState({});
    const [imageLinks, setImageLinks] = useState([]);

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

        fetch('/getImages?_id='+id)
            .then(data => data.json())
            .then(links => setImageLinks(links))

    }, [])

    return (
        <div className="detailed-post-class">
            <h1>{postData.title}</h1>
            <h3>{postData.shortDescription}</h3>
            <>
                {
                    imageLinks.map(image => <img key="" className="detailed-image" src={"/getImage?pathname="+image} alt="" width="25%"/>)
                }
            </>
            <ReactMarkdown className="md-content"  remarkPlugins={[gfm]}>{postData.description}</ReactMarkdown>
        </div>
    )
}

